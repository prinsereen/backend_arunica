import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { getAllStudent, getStudentById, updateStudentById, deleteStudentById } from "../controllers/Student.js";


const router = express.Router();

router.get('/students', verifyToken, getAllStudent)
router.get('/student', verifyToken, getStudentById)
router.patch('/student', verifyToken, updateStudentById)
router.delete('/student/:id', verifyToken, deleteStudentById)

export default router;