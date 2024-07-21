import express from "express";
import { addProgressMath,addProgressIps, createKnowledge, addProgressVideo, getKnowledge, getKnowledgeById, updateKnowledge, deleteKnowledge } from "../controllers/Material.js";
import { verifyAllUser } from "../middleware/VerifyAccses.js";
import { verifyTeacherAdmin } from "../middleware/VerifyAccses.js";


const router = express.Router();

router.post('/knowledge', verifyAllUser, createKnowledge);
router.get('/knowledge', verifyAllUser, getKnowledge);
router.post('/tambahnilai', verifyAllUser, addProgressVideo);
router.post('/tambahnilaimath', verifyAllUser, addProgressMath);
router.post('/tambahnilaiips', verifyAllUser, addProgressIps);
router.get('/knowledge/:id', verifyAllUser, getKnowledgeById);
router.patch('/knowledge/:id', verifyTeacherAdmin, updateKnowledge);
router.delete('/knowledge/:id', verifyTeacherAdmin, deleteKnowledge);

export default router;
