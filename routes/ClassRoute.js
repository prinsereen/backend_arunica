import express from "express";
import { getAllClass, createClass, updateClass, deleteClass } from "../controllers/Class.js";
import { verifyTokenAdmin } from "../middleware/verifyTokenAdmin.js";
import { verifyTeacherAdmin } from "../middleware/VerifyAccses.js";

const router = express.Router();

router.post('/class', verifyTokenAdmin, createClass);
router.get('/class', verifyTeacherAdmin, getAllClass);
router.patch('/class/:id', verifyTokenAdmin, updateClass); 
router.delete('/class/:id', verifyTokenAdmin, deleteClass); 

export default router;
