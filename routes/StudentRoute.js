import express from "express";
import { verifyStudentTeacher } from "../middleware/VerifyAccses.js";
import { getAllStudent, getStudentById, updateStudentById, deleteStudentById } from "../controllers/Student.js";

const router = express.Router();

router.get('/students', verifyStudentTeacher, getAllStudent);
router.get('/student', verifyStudentTeacher, getStudentById);
router.patch('/student', verifyStudentTeacher, updateStudentById);
router.delete('/student/:id', verifyStudentTeacher, deleteStudentById);

export default router;
