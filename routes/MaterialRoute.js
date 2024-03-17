import express from "express";
import { getAllMaterial, createMaterial, updateMaterial, deleteMaterial } from "../controllers/Materials.js";
import { verifyAllUser } from "../middleware/VerifyAccses.js";
import { verifyTeacherAdmin } from "../middleware/VerifyAccses.js";

const router = express.Router();

router.post('/material', verifyTeacherAdmin, createMaterial);
router.get('/material', verifyAllUser, getAllMaterial);
router.patch('/material/:id', verifyTeacherAdmin, updateMaterial); // Route for updating a Material
router.delete('/material/:id', verifyTeacherAdmin, deleteMaterial); // Route for deleting a subject

export default router;
