import HistoryBacaan from "../models/HistoryRingkasan.js";
import { success } from "../lib/Responser.js";
import Student from "../models/StudentModel.js";
import Buku from "../models/books.js";
import { ASAG } from "./GenAI.js";

export const createHistoryBacaan = async (req, res) => {
    try {
        const {id} = req.user;
        const {
            buku_id,
            dari,
            sampai,
            ringkasan
        } = req.body;

        const user = await Student.findByPk(id);
        const {literasi_activities, points} = user;


        let resultAsag = await ASAG(ringkasan)
        resultAsag = resultAsag
        console.log(resultAsag)
        const {pemahaman_siswa, kesesuaian_ringkasan, gen_ai_feedback} = resultAsag
        const exp = Math.floor(((pemahaman_siswa+kesesuaian_ringkasan)/2)/10)

        await user.update({
            literasi_activities: literasi_activities+1,
            points: points + exp
        })

        const newHistory = await HistoryBacaan.create({
            student_id: id,
            buku_id,
            dari,
            sampai,
            ringkasan,
            pemahanan_siswa: pemahaman_siswa,
            kesesuaiaan_ringkasan: kesesuaian_ringkasan,
            gen_ai_feedback,
            exp
        });

        return success(res, "Berhasil", newHistory)
    } catch (error) {
        return res.status(500).json({
            message: 'Gagal membuat history bacaan',
            error: error.message
        });
    }
};

export const getHistoryBacaan = async (req, res) => {
    try {
        const { id } = req.params;
        const history = await HistoryBacaan.findOne({
            where: {
                id
            },
            attributes: ['pemahanan_siswa', 'kesesuaiaan_ringkasan', 'gen_ai_feedback', 'exp']
        });
        if (!history) {
            return errorResponse(res, "History bacaan tidak ditemukan", 404);
        }
        return success(res, "Berhasil mendapatkan history bacaan", history);
    } catch (error) {
        return errorResponse(res, 'Gagal mendapatkan history bacaan', 500, error.message);
    }
};

export const getMyHistoryBookList = async(req, res) => {
    try {
        const {id} = req.user
        const histories = await HistoryBacaan.findAll({
            where: {
                student_id: id
            },
            attributes:[ 'id','dari', 'sampai'],
            include:{
                model: Buku,
                attributes: ['url_sampul', 'judul']
            }
        })

        return success(res, "Berhasil mendapatkan history bacaan", histories);
    } catch (error) {
        return res.status(500).json({
            message: 'Gagal membuat history bacaan',
            error: error.message
        });
    }
}