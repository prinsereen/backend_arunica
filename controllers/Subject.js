import {success, error} from "../lib/Responser.js";
import Subject from "../models/SubjectModel.js"

export const getAllSubject = async(req, res) => {
    try {
        const subjects = await Subject.findAll({
            attributes: ['id', 'subject_name', 'subject_grade']
        })
        return success(res, "Berhasil mendapatkan data semua subject", subjects);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createSubject = async(req, res) => {
    try {
        const { subject_name, subject_grade } = req.body;

        const newSubject = await Subject.create({
            subject_name,
            subject_grade
        })

        return success(res, "Berhasil membuat subject", newSubject);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const updateSubject = async (req, res) => {
    try {
        const { id } = req.params;
        const { subject_name, subject_grade } = req.body;

        const updatedSubject = await Subject.findOne({ where: { id } });

        if (!updatedSubject) {
            return res.status(404).json({ msg: "Subject not found" });
        }

        await updatedSubject.update({
            subject_name,
            subject_grade
        });

        return success(res, "Subject successfully updated", updatedSubject);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const deleteSubject = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedSubject = await Subject.findOne({ where: { id } });

        if (!deletedSubject) {
            return res.status(404).json({ msg: "Subject not found" });
        }

        await deletedSubject.destroy();

        return success(res, "Subject successfully deleted");
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
