import { check, validationResult } from "express-validator";
import Admin from "../models/AdminModel.js"


export const Register = [
    check('name').isLength({ min: 1 }).withMessage('tidak boleh kosong'),
    check('password').isLength({ min: 1 }).withMessage('tidak boleh kosong'),
    check('key').isLength({ min: 1 }).withMessage('tidak boleh kosong')
    .custom(async (key, { req }) => {
        if (key != "adminsekolah"){
            throw new Error('Key Salah')
        }
    }),
    check('email').isEmail().withMessage('format tidak sesuai')
    .custom(async (email, { req }) => {
        const existingEmail = await Admin.findOne({
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
    check('email').isLength({ min: 1 }).withMessage('tidak boleh kosong'),
    check('password').isLength({ min: 1 }).withMessage('tidak boleh kosong'),
]