import express from "express";
import { getAllMappingStudentClass, createOneStudentClass } from "../controllers/StudentClass.js";
import { verifyTokenAdmin } from "../middleware/verifyTokenAdmin.js";
import { verifyTeacherAdmin } from "../middleware/VerifyAccses.js";

const router = express.Router();

router.post('/mapping', verifyTokenAdmin, createOneStudentClass);
router.get('/mapping', verifyTeacherAdmin, getAllMappingStudentClass);

export default router;
