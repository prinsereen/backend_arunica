import { success, error } from "../lib/Responser.js";
import IsianSingkat from "../models/IsianSingkatModel.js";
import Quizes from "../models/QuizesModel.js";

export const createIsianSingkat = async (req, res) => {
    try {
        const { quiz_id, soal, jawaban } = req.body;

        const existingQuiz = await Quizes.findOne({
            where: { id: quiz_id }
        });
        if (!existingQuiz) {
            return res.status(404).json({ msg: 'Associated quiz not found' });
        }

        const newIsianSingkat = await IsianSingkat.create({
            quiz_id,
            soal,
            jawaban
        });

        return success(res, "Successfully created Isian Singkat", newIsianSingkat);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

export const getAllIsianSingkat = async (req, res) => {
    try {
        const isianSingkats = await IsianSingkat.findAll({
            where: {
                quiz_id: req.params.id
            }
        });

        return success(res, 'All Isian Singkat found', isianSingkats);
    } catch (error) {

        return res.status(500).json({ msg: error.message });
    }
};
