import { check, validationResult } from "express-validator";
import Student from "../models/StudentModel.js";

export const Register = [
    check('name').isLength({ min: 1 }).withMessage('tidak boleh kosong'),
    check('password').isLength({ min: 1 }).withMessage('tidak boleh kosong'),
    check('nisn').isLength({ min: 1 }).withMessage('tidak boleh kosong')
    .custom(async (nisn, { req }) => {
        const existingNisn = await Student.findOne({
            where: { nisn: nisn }
        });
        if (existingNisn) {
            throw new Error('user sudah terdaftar');
        }
    }),
    check('email').isEmail().withMessage('format tidak sesuai')
    .custom(async (email, { req }) => {
        const existingEmail = await Student.findOne({
            where: { email: email }
        });
        if (existingEmail) {
            throw new Error('user sudah terdaftar');
        }
    }),
    check('conf_password').custom(async (confPassword, { req }) => {
        const { password } = req.body;
        if (password !== await confPassword) {
            throw new Error('password dan confirmation password tidak cocok');
        }
    })
    
];

export const Login = [
    check('nisn').isLength({ min: 1 }).withMessage('tidak boleh kosong'),
    check('password').isLength({ min: 1 }).withMessage('tidak boleh kosong'),
]