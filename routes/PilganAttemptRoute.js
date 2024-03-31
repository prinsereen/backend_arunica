import express from "express";
import { creatAttemptPilgan } from "../controllers/PilganAttempt.js";
import { verifyTeacherAdmin } from "../middleware/VerifyAccses.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post('/attemptpilgan', verifyToken, creatAttemptPilgan);
//router.get('/pilgan/:id', verifyAllUser, getAllPilgans);
/* router.patch('/quiz/:id', verifyTeacherAdmin, updatequiz); // Route for updating a quiz
router.delete('/quiz/:id', verifyTeacherAdmin, deleteMaterial); // Route for deleting a subject
 */
export default router;
