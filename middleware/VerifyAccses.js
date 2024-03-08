import jwt from "jsonwebtoken"
import { verifyToken } from "./verifyToken.js";
import { verifyTokenTeacher } from "./verifyTokenTeacher.js";

export const verifyStudentTeacher = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401);
    }

    // Check if the token is valid for student
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (!err) {
            verifyToken(req, res, next)
        } else {
            // If token is not valid for student, try teacher verification
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_TEACHER, (err, decoded) => {
                verifyTokenTeacher(req, res, next)
            });
        }
    });
};

