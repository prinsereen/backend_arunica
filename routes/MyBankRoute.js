import express from 'express';
import {
    createMyBank,
    getMyBanks,
    getMyBankById,
    updateMyBank,
    deleteMyBank
} from '../controllers/MyBank.js';
import upload from '../middleware/multer.js';
import { verifyAllUser } from "../middleware/VerifyAccess.js";

const router = express.Router();

router.post('/mybanks', verifyAllUser, upload.fields([{ name: 'sampul', maxCount: 1 }, { name: 'buku', maxCount: 1 }]), createMyBank);
router.get('/mybanks', verifyAllUser, getMyBanks);
router.get('/mybanks/:id', verifyAllUser, getMyBankById);
router.put('/mybanks/:id', verifyAllUser, upload.fields([{ name: 'sampul', maxCount: 1 }, { name: 'buku', maxCount: 1 }]), updateMyBank);
router.delete('/mybanks/:id', verifyAllUser, deleteMyBank);

export default router;
