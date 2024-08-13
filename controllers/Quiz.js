import { success, error } from "../lib/Responser.js";
import Quizes from "../models/QuizesModel.js";
import Class from "../models/ClassModel.js";
import Material from "../models/MaterialsModel.js";

export const createQuiz = async(req, res) => {
    try {
        const {
            class_id, 
            materials_id, 
            durasi,
            total_attempt,
            total_exp,
            thumbnail_url,
            deskripsi,
            jumlah_pilihan_ganda,
            skor_pilgan,
            jumlah_isian_singkat,
            skor_isian_singkat,
            jumlah_esai,
            skor_esai
        } = req.body;

        const existingClass = await Class.findByPk(class_id);
        if (!existingClass) {
            throw new Error('Invalid class_id. Class not found.');
        }

        const newQuiz = await Quizes.create({
            class_id, 
            materials_id, 
            durasi,
            total_attempt,
            total_exp,
            thumbnail_url,
            deskripsi,
            jumlah_pilihan_ganda,
            skor_pilgan,
            jumlah_isian_singkat,
            skor_isian_singkat,
            jumlah_esai,
            skor_esai
        });

        return success(res, "Berhasil membuat kuis baru", newQuiz);
    } catch (error) {
        if (error.message === 'Invalid class_id. Class not found.') {
            return res.status(400).json({ msg: error.message });
        }
        return res.status(500).json({ msg: error.message });
    }
}
export const getQuizById = async (req, res) => {
    try {
        const { id } = req.params;

        const quiz = await Quizes.findOne({
            where:{id},
            include:[
                {
                    model: Class,
                    required: true,
                    as: "class"
                },
                {
                    model: Material,
                    required: true,
                    as: "material"
                }
            ]
        })

        if (!quiz) {
            return res.status(404).json({ msg: 'Quiz not found' });
        }
        return success(res, 'Quiz found', quiz);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};
