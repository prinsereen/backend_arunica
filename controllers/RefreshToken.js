import jwt from "jsonwebtoken";
import Student from "../models/StudentModel.js";
import Teacher from "../models/TeacherModel.js";
import Admin from "../models/AdminModel.js";

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.sendStatus(401);
        }

        const user = await Student.findOne({ where: { refresh_token: refreshToken } });
        if (!user) {
            return res.sendStatus(403);
        }

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.sendStatus(403);
            }

            const { id, uuid, name, email, nisn } = user;

            const accessToken = generateToken({ id, uuid, name, email, nisn });

            res.json({ accessToken });
        });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

function generateToken(payload, secret = process.env.ACCESS_TOKEN_SECRET) {
    return jwt.sign(payload, secret, { expiresIn: '1d' });
}

export const refreshTokenTeacher = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.sendStatus(401);
        }

        const user = await Teacher.findOne({ where: { refresh_token: refreshToken } });
        if (!user) {
            return res.sendStatus(403);
        }

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_TEACHER, (err, decoded) => {
            if (err) {
                return res.sendStatus(403);
            }

            const { id, name, email } = user;

            const accessToken = generateTokenTeacher({id, name, email});

            res.json({ accessToken });
        });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

function generateTokenTeacher(payload, secret = process.env.ACCESS_TOKEN_SECRET_TEACHER) {
    return jwt.sign(payload, secret, { expiresIn: '1d' });
}


export const refreshTokenAdmin = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.sendStatus(401);
        }

        const user = await Admin.findOne({ where: { refresh_token: refreshToken } });
        if (!user) {
            return res.sendStatus(403);
        }

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_ADMIN, (err, decoded) => {
            if (err) {
                return res.sendStatus(403);
            }

            const { id, name, email } = user;

            const accessToken = generateTokenAdmin({id, name, email});

            res.json({ accessToken });
        });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

function generateTokenAdmin(payload, secret = process.env.ACCESS_TOKEN_SECRET_ADMIN) {
    return jwt.sign(payload, secret, { expiresIn: '1d' });
}