import express from "express";
import { createIsianSingkat, getAllIsianSingkat } from "../controllers/IsiainSingkat.js";
import { verifyAllUser } from "../middleware/VerifyAccses.js";
import { verifyTeacherAdmin } from "../middleware/VerifyAccses.js";

const router = express.Router();

router.post('/isiansingkat', verifyTeacherAdmin, createIsianSingkat);
router.get('/isiansingkat/:id', verifyAllUser, getAllIsianSingkat);
/* router.patch('/quiz/:id', verifyTeacherAdmin, updatequiz); // Route for updating a quiz
router.delete('/quiz/:id', verifyTeacherAdmin, deleteMaterial); // Route for deleting a subject
 */
export default router;
