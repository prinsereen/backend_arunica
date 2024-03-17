import {success, error} from "../lib/Responser.js";
import StudentClass from "../models/StudentClassModel.js";
import Student from "../models/StudentModel.js";
import Class from "../models/classModel.js";
import Teacher from "../models/TeacherModel.js";
import Subject from "../models/SubjectModel.js";
import excelToJson from "convert-excel-to-json";
import fs from "fs-extra"

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

export const mappingFromExcel = async (req, res) => {
    try {
        if (req.file?.filename == null || req.file?.filename == "undefined"){
            return error(res, "No file", {})
        } else {
            const filePath = "uploads/" + req.file.filename;

            const excelData = excelToJson({
                sourceFile: filePath,
                header: {
                    rows: 1,
                },
                columnToKey: {
                    "*": "{{columnHeader}}"
                }
            });

            const mapping = excelData.Sheet1;
            let mappingError = [];
            for (let i = 0 ; i < mapping.length ; i++){
                let data = mapping[i];
                let checkStudent = await Student.findOne({
                    where: {nisn: data.nisn}
                });
                let checkClass = await Class.findOne({
                    where: {nama_kelas: data.kelas}
                });

                if (checkClass && checkStudent) {
                    // Check if the student is already registered in the class
                    const existingMapping = await StudentClass.findOne({
                        where: {
                            student_id: checkStudent.id,
                            class_id: checkClass.id
                        }
                    });

                    if (!existingMapping) {
                        // If not registered, create a new mapping
                        console.log(checkStudent.id);
                        await StudentClass.create({
                            student_id: checkStudent.id,
                            class_id: checkClass.id
                        });
                    } else {
                        // If already registered, add to error array
                        mappingError.push(data);
                    }
                    
                } else {
                    mappingError.push(data);
                }
            }
            fs.remove(filePath);
            return success(res, "Berhasil membuat mapping student class", mappingError);
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

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
