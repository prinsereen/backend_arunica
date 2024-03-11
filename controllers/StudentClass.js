import {success, error} from "../lib/Responser.js";
import StudentClass from "../models/StudentClassModel.js";
import Student from "../models/StudentModel.js";
import Class from "../models/classModel.js";
import Teacher from "../models/TeacherModel.js";
import Subject from "../models/SubjectModel.js";

export const getAllMappingStudentClass = async(req, res) => {
    try {
        const {id, student_id, class_id} = req.query;
        let mappingStudentClass;

        if(id){
            mappingStudentClass = await StudentClass.findOne({
                where:{id},
                include:[
                    {
                        model:Student,
                        as: "student",
                        required: true,
                        attributes: attr
                    },
                    {
                        model: Class,
                        as: "class",
                        required: true,
                        attributes: ['id', 'teacher_id', 'subject_id'],
                        include:[
                            {
                                model: Teacher,
                                as: 'teacher',
                                attributes: ['name', 'email', 'nip'],
                                required: true
                            },
                            {
                                model: Subject,
                                as: 'subject',
                                attributes: ['subject_name', 'subject_grade'],
                                required: true
                            }
                        ]
                    }
                ]
            })
        }else if (student_id){
            mappingStudentClass = await StudentClass.findAll({
                where:{
                    student_id
                },
                include:[
                    {
                        model:Student,
                        as: "student",
                        required: true,
                        attributes: attr
                    },
                    {
                        model: Class,
                        as: "class",
                        required: true,
                        attributes: ['id', 'teacher_id', 'subject_id'],
                        include:[
                            {
                                model: Teacher,
                                as: 'teacher',
                                attributes: ['name', 'email', 'nip'],
                                required: true
                            },
                            {
                                model: Subject,
                                as: 'subject',
                                attributes: ['subject_name', 'subject_grade'],
                                required: true
                            }
                        ]
                    }
                ]
            })
        }else if (class_id){
            mappingStudentClass = await StudentClass.findAll({
                where:{
                    class_id
                },
                include:[
                    {
                        model:Student,
                        as: "student",
                        required: true,
                        attributes: attr
                    },
                    {
                        model: Class,
                        as: "class",
                        required: true,
                        attributes: ['id', 'teacher_id', 'subject_id'],
                        include:[
                            {
                                model: Teacher,
                                as: 'teacher',
                                attributes: ['name', 'email', 'nip'],
                                required: true
                            },
                            {
                                model: Subject,
                                as: 'subject',
                                attributes: ['subject_name', 'subject_grade'],
                                required: true
                            }
                        ]
                    }
                ]
            })
        }
        if (!mappingStudentClass) { return error(res, "mapping student class tidak ditemukan", {})};
        return success(res, "Berhasil mendapatkan mapping user", mappingStudentClass);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createOneStudentClass = async(req, res) => {
    try {
        const {student_id, class_id} = req.body;

        const mappingStudentClass = await StudentClass.create({
            student_id,
            class_id
        })
        return success(res, "Berhasil membuat mapping student class", mappingStudentClass);
    } catch (error) {
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
