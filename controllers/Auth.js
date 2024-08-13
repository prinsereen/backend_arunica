import Student from "../models/StudentModel.js";
import {success, error} from "../lib/Responser.js"
import bcrypt from "bcrypt"
import jwt  from "jsonwebtoken";
import { check, validationResult } from "express-validator";

export const register = async(req, res) => {
    const {name, email, nisn, password, conf_password} = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return error(res,  errors["errors"][0].path + " " + errors["errors"][0].msg, errors["errors"])
    }

    try {
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        const newStudent = await Student.create({
            name: name,
            email: email,
            nisn: nisn,
            password: hashPassword
        });
        
        return success(res, "Berhasil Register", newStudent);
        
    } catch (error) {
        console.log(error)
    }
}

export const login = async (req, res) => {
    try {
        const { nisn, password } = req.body;
        console.log("Here I'am")

        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessage = `${errors.errors[0].param} ${errors.errors[0].msg}`;
            return error(res, errorMessage, errors.errors);
        }

        // Find user by nisn
        const user = await Student.findOne({ where: { nisn } });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Compare passwords
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return error(res, "Wrong Password");
        }

        // Generate access and refresh tokens
        const { id, uuid, name, email } = user;
        const accessToken = generateToken({ id, uuid, name, email, nisn });
        const refreshToken = generateToken({ id, uuid, name, email, nisn }, process.env.REFRESH_TOKEN_SECRET);

        // Update refresh token in database
        await Student.update({ refresh_token: refreshToken }, { where: { nisn } });

        // Set refreshToken cookie
        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 1000 });

        // Send access token in response
        res.json({ accessToken });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Student.findOne({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user) return res.sendStatus(204);
    const nisn = user.nisn;
    await Student.update({refresh_token: null},{
        where:{
            nisn: nisn
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200)
}

export const getMe = async (req, res) => {
    try {
        // Extract the user's information from the request object
        const { id } = req.user;

        // Fetch the user's information from the database based on their ID
        const user = await Student.findOne({ where: { id }});
        console.log(user.points)

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        const total = user.math_activities + 
                      user.ipa_activities +
                      user.pkn_activities + 
                      user.literasi_activities + 
                      user.ips_activities + 
                      user.bindo_activities + 
                      user.bing_activities + 
                      user.senbud_activities
        //console.log(total)

        const response = {
            firstName: user.name.split(' ')[0],
            url_photo: user.url_photo,
            progress: ((user.points % 50) / 50) * 100,
            level: Math.floor(user.points/50),
            math: user.math_activities / total, 
            ipa: user.ipa_activities / total, 
            pkn: user.pkn_activities / total, 
            literasi: user.literasi_activities / total, 
            ips: user.ips_activities / total, 
            bindo: user.bindo_activities / total, 
            bing: user.bing_activities / total, 
            senbud: user.senbud_activities / total, 
        }

        // Return the user's information
        return success(res, "User details retrieved successfully", response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const getLeaderboard = async (req, res) => {
    try {
        const users = await Student.findAll({
            attributes: ['url_photo', 'name', 'points']
        });

        // Transform users array to include progress and level
        const transformedUsers = users.map(user => {
            const points = user.points;
            const progress = ((points % 50) / 50) * 100;
            const level = Math.floor(points / 50);
            return {
                img: user.url_photo,
                nama: user.name.split(' ')[0],
                Level: `Lvl ${level} EXP ${progress.toFixed(2)}`,
                points: points // Tambahkan properti points untuk sorting
            };
        });

        // Sort transformed users by points in descending order
        transformedUsers.sort((a, b) => b.points - a.points);

        // Remove the points property from the final response if it's not needed
        const finalUsers = transformedUsers.map(({ points, ...rest }) => rest);

        return success(res, "User details retrieved successfully", finalUsers);
    } catch (error) {
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};



export const getProfileName = async(req, res) => {
    try {
        // Extract the user's information from the request object
        const { id } = req.user;

        // Fetch the user's information from the database based on their ID
        const user = await Student.findOne({ where: { id }});
        //console.log(user.points)

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const response = {
            firstName: user.name.split(' ')[0],
            url_photo: user.url_photo
        }

        // Return the user's information
        return success(res, "User details retrieved successfully", response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
} 

const attr = [
    'uuid',
    'name',
    'email',
    'nisn',
    'grade',
    'class',
    'points',
    'url_photo',
    'math_activities',
    'ipa_activities',
    'pkn_activities',
    'literasi_activities',
    'ips_activities',
    'bindo_activities',
    'bing_activities',
    'senbud_activities'
]

function generateToken(payload, secret = process.env.ACCESS_TOKEN_SECRET) {
    return jwt.sign(payload, secret, { expiresIn: '1d' });
}