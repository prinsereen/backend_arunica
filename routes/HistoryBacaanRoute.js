import express from 'express';
import {createHistoryBacaan, getHistoryBacaan, getMyHistoryBookList} from '../controllers/HistoryBacaan.js'; 
import { verifyAllUser } from "../middleware/VerifyAccses.js";


const router = express.Router();

router.post('/history-bacaan', verifyAllUser, createHistoryBacaan);
router.get('/my-history-bacaan', verifyAllUser, getMyHistoryBookList);
router.get('/history-bacaan/:id',verifyAllUser, getHistoryBacaan);

export default router;
