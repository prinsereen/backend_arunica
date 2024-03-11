import Student from "../models/StudentModel.js";
import {success, error} from "../lib/Responser.js";
import bcrypt from "bcrypt"

export const getAllStudent = async(req, res) => {
    try {
        const student = await Student.findAll({
            attributes: attr
        });
        return success(res, "Berhasil mendapatkan data semua student", student);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


//  Nanti Implementasiin Get By id sama nisn
export const getStudentById = async(req, res) => {
    try {
        const {id, nisn} = req.query;
        let student;

        if(id){
            student =  await findStudentById(id)
        }else if(nisn){
            student = await findStundetByNisn(nisn)
        }

        if (!student) { return error(res, "Student tidak ditemukan", {})};
        return success(res, "Berhasil mendapatkan data student", await student);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

//ini juga implementasiin by id sama by nisn 
export const updateStudentById = async (req, res) => {
    try { 
        const {id, nisn} = req.query;
        let student;

        if(id){
            student = await findStudentById(id)
            if ((req.user.uuid != req.query.id) ){
                return error(res, "Unauthorized", {}, 401);
            }
        }else if(nisn){
            student = await  findStundetByNisn(nisn)
            if ((req.user.nisn != req.query.nisn)){
                return error(res, "Unauthorized", {}, 401);
            }
        }

        if (!student) {
            return error(res, "Student tidak ditemukan", {});
        }

        const { name, email, password, confPassword } = req.body;

        let hashPassword = student.password;

        if (password) {
            const salt = await bcrypt.genSalt();
            hashPassword = await bcrypt.hash(password, salt);
        }

        if (password && password !== confPassword) {
            return error(res, "Password dan confirmation tidak sesuai", {});
        }

        let updatedStudent

        if(id){
            updatedStudent = await  updateStudentByUUId(name, email, hashPassword, id)
        }else if(nisn){
            updatedStudent = await updateStundetByNisn(name, email, hashPassword, nisn)
        }

        return success(res, "Update berhasil", updatedStudent);
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

const attr = [
    'uuid',
    'name',
    'email',
    'nisn',
    'grade',
    'class',
    'points',
    'avg_quiz_score',
    'avg_read_score',
    'competiton_recomendation'
]

async function findStudentById(id) {
    return await Student.findOne({
        where: {
            uuid: id
        },
        attributes: attr
    });
}

async function findStundetByNisn(nisn){
    return await Student.findOne({
        where: {
            nisn
        },
        attributes: attr
    });
}

async function updateStudentByUUId(name, email, hashPassword, id) {
    await Student.update(
        {
            name: name,
            email: email,
            password: hashPassword
        },
        {
            where: {
                uuid: id
            },
            attributes: attr
        }
    );

    return await findStudentById(id);
}

async function updateStundetByNisn(name, email, hashPassword, nisn){
    await Student.update(
        {
            name: name,
            email: email,
            password: hashPassword
        },
        {
            where: {
                nisn
            },
            attributes: attr
        }
    );

    return await findStundetByNisn(nisn);
}