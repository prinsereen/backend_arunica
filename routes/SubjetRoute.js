import express from "express";
import { getAllSubject, createSubject, updateSubject, deleteSubject } from "../controllers/Subject.js";
import { verifyTokenAdmin } from "../middleware/verifyTokenAdmin.js";
import { verifyTeacherAdmin } from "../middleware/VerifyAccses.js";

const router = express.Router();

router.post('/subject', verifyTokenAdmin, createSubject);
router.get('/subject', verifyTeacherAdmin, getAllSubject);
router.patch('/subject/:id', verifyTokenAdmin, updateSubject); // Route for updating a subject
router.delete('/subject/:id', verifyTokenAdmin, deleteSubject); // Route for deleting a subject

export default router;
