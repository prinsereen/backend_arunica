import Student from "../models/StudentModel.js";
import {success, error} from "../lib/Responser.js";
import bcrypt from "bcrypt"
import { where } from "sequelize";

export const getAllStudent = async(req, res) => {
    try {
        const student = await Student.findAll({
            attributes: [
                'id',
                'name',
                'email',
                'nisn',
                'grade',
                'class',
                'avg_quiz_score',
                'avg_read_score',
                'competiton_recomendation'
            ]
        });
        return success(res, "Berhasil mendapatkan data semua student", student);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getStudentById = async(req, res) => {
    try {
        const student = await Student.findOne({
        attributes: [
            'id',
            'name',
            'email',
            'nisn',
            'grade',
            'class',
            'avg_quiz_score',
            'avg_read_score',
            'competiton_recomendation'
        ], 
            where: {
                id: req.params.id 
            }
        })
        if (!student) { return error(res, "Student tidak ditemukan", {})};
        return success(res, "Berhasil mendapatkan data student", student);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


export const updateStudentById = async (req, res) => {
    try { 
        let student = await findStudentById(req.params.id);

        if (!student) {
            return error(res, "Student tidak ditemukan", {});
        }

        const { name, email, clas, grade, password, confPassword } = req.body;
        if (req.user.id != req.params.id){return error(res, "Unauthorized", {}, 401);}

        let hashPassword = student.password;

        if (password) {
            const salt = await bcrypt.genSalt();
            hashPassword = await bcrypt.hash(password, salt);
        }

        if (password && password !== confPassword) {
            return error(res, "Password dan confirmation tidak sesuai", {});
        }

        await Student.update(
            {
                name: name,
                email: email,
                class: clas,
                grade: grade,
                password: hashPassword
            },
            {
                where: {
                    id: req.params.id
                },
                attributes: [
                    'id',
                    'name',
                    'email',
                    'class',
                    'grade'
                ]
            }
        );

        student = await findStudentById(req.params.id);

        return success(res, "Update berhasil", student);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: error.message });
    }
};


export const deleteStudentById = async(req, res) => {
    try {
        const student = await findStudentById(req.params.id);

        if (!student){return error(res, "Student tidak ditemukan");}
        await student.destroy()
        return success(res, "Berhasil menghapus student", {} ,204)
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: error.message });
    }
}

async function findStudentById(id) {
    return await Student.findOne({
        where: {
            id: id
        },
        attributes: [
            'id',
            'name',
            'email',
            'class',
            'grade'
        ]
    });
}