import express from 'express';
import {
    createBuku,
    getBukus,
    getBukuById,
    updateBuku,
    deleteBuku,
    getHomeBukus
} from '../controllers/Book.js';
import upload from '../middleware/multer.js';
import { verifyTokenTeacher } from "../middleware/verifyTokenTeacher.js";
import { verifyAllUser } from "../middleware/VerifyAccses.js";

const router = express.Router();

router.post('/bukus',verifyAllUser, upload.fields([{ name: 'sampul', maxCount: 1 }, { name: 'buku', maxCount: 1 }]), createBuku);
router.get('/bukus',verifyAllUser, getBukus);
router.get('/homebukus',verifyAllUser, getHomeBukus);
router.get('/bukus/:id', verifyAllUser, getBukuById);
router.put('/bukus/:id', verifyAllUser, upload.fields([{ name: 'sampul', maxCount: 1 }, { name: 'buku', maxCount: 1 }]), updateBuku);
router.delete('/bukus/:id', verifyAllUser, deleteBuku);

export default router;
