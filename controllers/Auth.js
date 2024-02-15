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
        const { id, name, email, nisn } = req.user;

        // Fetch the user's information from the database based on their ID
        const user = await Student.findOne({ where: { id }, attributes: attr });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Return the user's information
        return success(res, "User details retrieved successfully", user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

const attr = [
    'uuid',
    'name',
    'email',
    'nisn',
    'grade',
    'class',
    'avg_quiz_score',
    'avg_read_score',
    'competiton_recomendation'
]

function generateToken(payload, secret = process.env.ACCESS_TOKEN_SECRET) {
    return jwt.sign(payload, secret, { expiresIn: '1d' });
}