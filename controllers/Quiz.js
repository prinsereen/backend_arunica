import { success, error } from "../lib/Responser.js";
import Quizes from "../models/QuizesModel.js";
import Class from "../models/classModel.js";
import Material from "../models/MaterialsModel.js";

// Define a function to generate auto-increment IDs
async function generateAutoIncrementId(fieldName) {
    const maxRecord = await Quizes.max(fieldName);
    return (maxRecord || 0) + 1;
}

export const createQuiz = async(req, res) => {
    try {
        const { tipe_essai, class_id, materials_id } = req.body;

        // Verify that the class_id exists in the classes table
        const existingClass = await Class.findByPk(class_id);
        if (!existingClass) {
            throw new Error('Invalid class_id. Class not found.');
        }

        // Generate auto-increment IDs for primary key fields
        const pilgan_id = await generateAutoIncrementId('pilgan_id');
        const isian_singkat_id = await generateAutoIncrementId('isian_singkat_id');
        const essai_id = await generateAutoIncrementId('essai_id');

        // Membuat objek kuis baru dengan manual generated IDs
        const newQuiz = await Quizes.create({
            tipe_essai,
            pilgan_id,
            isian_singkat_id,
            essai_id,
            class_id,
            materials_id
        });

        // Mengembalikan respons sukses
        return success(res, "Berhasil membuat kuis baru", newQuiz);
    } catch (error) {
        // Handling specific error
        if (error.message === 'Invalid class_id. Class not found.') {
            return res.status(400).json({ msg: error.message });
        }
        // Handling other errors
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
