import { success, error } from "../lib/Responser.js";
import Pilgans from "../models/PilgansModel.js";
import Quizes from "../models/QuizesModel.js";

export const createPilgan = async (req, res) => {
    try {
        const { quiz_id, soal, pilihan_a, pilihan_b, pilihan_c, pilihan_d, jawaban_benar } = req.body;

        const existingQuiz = await Quizes.findOne({
            where: { id: quiz_id}
        });
        if (!existingQuiz) {
            return res.status(404).json({ msg: 'Associated quiz not found' });
        }

        const newPilgan = await Pilgans.create({
            quiz_id,
            soal,
            pilihan_a,
            pilihan_b,
            pilihan_c,
            pilihan_d,
            jawaban_benar
        });

        return success(res, "Successfully created Pilgan", newPilgan);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

export const getAllPilgans = async (req, res) => {
    try {
        const pilgans = await Pilgans.findAll({
            where:{
                quiz_id: req.params.id
            }
        });
        // Return success response with the Pilgans data
        return success(res, 'All Pilgans found', pilgans);
    } catch (error) {
        // If an error occurs, return a 500 Internal Server Error response
        return res.status(500).json({ msg: error.message });
    }
};