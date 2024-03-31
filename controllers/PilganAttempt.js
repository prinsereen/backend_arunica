import { success, error } from "../lib/Responser.js";
import Pilgans from "../models/PilgansModel.js";
import PilganAttempt from "../models/PilganAttemptModel.js";

export const creatAttemptPilgan = async(req, res) => {
    try {
        const { pilgan_id, jawaban } = req.body;

        const soalPilgan = await Pilgans.findByPk(pilgan_id);
        const kunciJawaban = soalPilgan.jawaban_benar;
        const nilai = kunciJawaban === jawaban ? 1 : 0

        const attempt = await PilganAttempt.create({
            student_id : req.user.id,
            pilgan_id,
            jawaban,
            nilai
        })

        return success(res, "Berhasil attempt", attempt)
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
} 