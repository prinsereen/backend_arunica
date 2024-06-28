import {success, error} from "../lib/Responser.js";
import Class from "../models/ClassModel.js";
import Teacher from "../models/TeacherModel.js";
import Subject from "../models/SubjectModel.js";

export const getAllClass = async (req, res) => {
    try {
        const classes = await Class.findAll({
            attributes: ['id', 'nama_kelas','teacher_id', 'subject_id'],
            include: [
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
        });
        return success(res, "Berhasil mendapatkan data semua class", classes);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


export const createClass = async(req, res) => {
    try {
        const {teacher_id, subject_id, nama_kelas} = req.body;

        const newClass = await Class.create({
            teacher_id,
            subject_id,
            nama_kelas
        })

        return success(res, "Berhasil membuat kelas baru ", newClass);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const updateClass = async (req, res) => {
    try {
        const { id } = req.params;
        const { teacher_id, subject_id, nama_kelas } = req.body;

        const updatedClass = await Class.findOne({ where: { id } });

        if (!updatedClass) {
            return res.status(404).json({ msg: "Kelas tidak ditemukan" });
        }

        await updatedClass.update({
            teacher_id,
            subject_id,
            nama_kelas
        });

        return success(res, "Kelas berhasil diperbarui", updatedClass);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const deleteClass = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedClass = await Class.findOne({ where: { id } });

        if (!deletedClass) {
            return res.status(404).json({ msg: "Kelas tidak ditemukan" });
        }

        await deletedClass.destroy();

        return success(res, "Kelas berhasil dihapus");
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
