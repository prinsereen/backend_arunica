import express from "express";
import { createQuiz, getQuizById } from "../controllers/Quiz.js";
import { verifyAllUser } from "../middleware/VerifyAccses.js";
import { verifyTeacherAdmin } from "../middleware/VerifyAccses.js";

const router = express.Router();

router.post('/quiz', verifyTeacherAdmin, createQuiz);
router.get('/quiz/:id', verifyAllUser, getQuizById);
/* router.patch('/quiz/:id', verifyTeacherAdmin, updatequiz); // Route for updating a quiz
router.delete('/quiz/:id', verifyTeacherAdmin, deleteMaterial); // Route for deleting a subject
 */
export default router;
