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

        const studentData = newStudent.get();
        console.log(studentData)

        delete studentData.id;
        delete studentData.id;
        delete studentData.password;
        delete studentData.updatedAt;
        delete studentData.createdAt;
        
        return success(res, "Berhasil Register", studentData);
        
    } catch (error) {
        console.log(error)
    }
}

export const login = async(req, res) => {
    try {

        const {nisn, password} = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return error(res,  errors["errors"][0].path + " " + errors["errors"][0].msg, errors["errors"])
        }

        const user = await Student.findOne({
            where:{
                nisn: nisn
            }
        })

        const match = await bcrypt.compare(password, user.password);
        if(!match) return error(res, "Wrong Password")

        const user_id = user.id;
        const user_name = user.name;
        const user_email = user.email;
        const user_nisn = user.nisn;

        const accessToken = jwt.sign({user_id, user_name, user_email, user_nisn}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        const refreshToken = jwt.sign({user_id, user_name, user_email, user_nisn}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        await Student.update({refresh_token: refreshToken}, {
            where: {
                nisn: nisn
            }
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24*60*1000
        });
        res.json({accessToken})
    } catch (error) {
        console.log(error)
        res.status(404).json({msg: "User Tidak Ditemukan"})
    }
}

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