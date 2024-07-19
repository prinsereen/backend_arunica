import express from 'express';
import {
    createComic,
    getMyComics,
    getComicById,
    updateComic,
    deleteComic,
    getVerifiedComic,
    getFourComic
} from "../controllers/Comic.js";
import upload from '../middleware/multer.js';
import { verifyTokenTeacher } from "../middleware/verifyTokenTeacher.js";
import { verifyAllUser } from "../middleware/VerifyAccses.js";


const router = express.Router();

router.post('/comics', verifyAllUser, upload.single('file'), createComic);
router.get('/my/comics', verifyAllUser, getMyComics);
router.get('/verified/comics', verifyAllUser, getVerifiedComic);
router.get('/homecomics', verifyAllUser, getFourComic);
router.get('/comics/:id', verifyAllUser, getComicById);
router.put('/comics/:id', verifyTokenTeacher, upload.single('file'), updateComic);
router.delete('/comics/:id', deleteComic);

export default router;
