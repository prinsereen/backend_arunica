import express from "express";
import { verifyAllUser } from "../middleware/VerifyAccses.js";
import { getAllStudent, getStudentById, updateStudentById, deleteStudentById } from "../controllers/Student.js";

const router = express.Router();

router.get('/students', verifyAllUser, getAllStudent);
router.get('/student', verifyAllUser, getStudentById);
router.patch('/student', verifyAllUser, updateStudentById);
router.delete('/student/:id', verifyAllUser, deleteStudentById);

export default router;
