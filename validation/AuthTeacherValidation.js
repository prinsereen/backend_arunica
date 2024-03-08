import { check, validationResult } from "express-validator";
import Teacher from "../models/TeacherModel.js";


export const Register = [
    check('name').isLength({ min: 1 }).withMessage('tidak boleh kosong'),
    check('password').isLength({ min: 1 }).withMessage('tidak boleh kosong'),
    check('nip').isLength({ min: 1 }).withMessage('tidak boleh kosong')
    .custom(async (nip, { req }) => {
        const existingnip = await Teacher.findOne({
            where: { nip: nip }
        });
        if (existingnip) {
            throw new Error('user sudah terdaftar');
        }
    }),
    check('email').isEmail().withMessage('format tidak sesuai')
    .custom(async (email, { req }) => {
        const existingEmail = await Teacher.findOne({
            where: { email: email }
        });
        console.log(existingEmail)
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
    check('nip').isLength({ min: 1 }).withMessage('tidak boleh kosong'),
    check('password').isLength({ min: 1 }).withMessage('tidak boleh kosong'),
]