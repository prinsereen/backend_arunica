import express from "express";
import { createEssai, getAllEssai } from "../controllers/Essai.js";
import { verifyAllUser } from "../middleware/VerifyAccses.js";
import { verifyTeacherAdmin } from "../middleware/VerifyAccses.js";

const router = express.Router();

router.post('/essai', verifyTeacherAdmin, createEssai);
router.get('/essai/:id', verifyAllUser, getAllEssai);
/* router.patch('/quiz/:id', verifyTeacherAdmin, updatequiz); // Route for updating a quiz
router.delete('/quiz/:id', verifyTeacherAdmin, deleteMaterial); // Route for deleting a subject
 */
export default router;
