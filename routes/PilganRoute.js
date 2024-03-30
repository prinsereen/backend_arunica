import express from "express";
import { createPilgan, getAllPilgans } from "../controllers/Pilgan.js";
import { verifyAllUser } from "../middleware/VerifyAccses.js";
import { verifyTeacherAdmin } from "../middleware/VerifyAccses.js";

const router = express.Router();

router.post('/pilgan', verifyTeacherAdmin, createPilgan);
router.get('/pilgan/:id', verifyAllUser, getAllPilgans);
/* router.patch('/quiz/:id', verifyTeacherAdmin, updatequiz); // Route for updating a quiz
router.delete('/quiz/:id', verifyTeacherAdmin, deleteMaterial); // Route for deleting a subject
 */
export default router;
