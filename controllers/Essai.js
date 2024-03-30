import { success, error } from "../lib/Responser.js";
import Essai from "../models/EssaiModel.js";
import Quizes from "../models/QuizesModel.js";

export const createEssai = async (req, res) => {
    try {
        const { quiz_id, soal, tipe, jawaban} = req.body;

        const existingQuiz = await Quizes.findOne({
            where: { id: quiz_id }
        });
        if (!existingQuiz) {
            return res.status(404).json({ msg: 'Associated quiz not found' });
        }

        let createdEssai;
        if (tipe === 'text') {
            createdEssai = await Essai.create({
                quiz_id,
                soal,
                tipe,
                jawaban
            });
        } else if (tipe === 'pict') {
            createdEssai = await Essai.create({
                quiz_id,
                soal,
                tipe
            });
        } else {
            return res.status(400).json({ msg: 'Invalid answer type' });
        }

        return success(res, "Successfully created Essai", createdEssai);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

export const getAllEssai = async (req, res) => {
    try {
        const essais = await Essai.findAll({
            where: {
                quiz_id: req.params.id
            }
        });
        // Return success response with the Essai data
        return success(res, 'All Essai found', essais);
    } catch (error) {
        // If an error occurs, return a 500 Internal Server Error response
        return res.status(500).json({ msg: error.message });
    }
};
