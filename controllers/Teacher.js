import {success, error} from "../lib/Responser.js";
import bcrypt from "bcrypt"
import Teacher from "../models/TeacherModel.js";

export const getAllTeacher = async(req, res) => {
    try {
        const teachers = await Teacher.findAll({
            attributes: attr
        })
        return success(res, "Berhasil mendapatkan data semua student", teachers);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getTeacherbyId = async(req, res) => {
    try {
        const teacher = await Teacher.findOne({
            where:{
                id: req.params.id,
                attributes: attr
            }
        })
        if(teacher){
            return success(res, "Berhasil mendapatkan Teacher")
        }else{
            return error(res, "Teacher Not Found")
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: error.message });
    }
}

export const updateTeacherById = async(req, res) => {
    try {
        
    } catch (error) {
        
    }
}

const attr = [
    'name',
    'nip',
    'email'
]