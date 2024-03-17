import express from "express";
import { verifyAllUser } from "../middleware/VerifyAccses.js";
import { personalAssistance } from "../controllers/GenAI.js";

const router = express.Router();

router.post('/arunda', verifyAllUser, personalAssistance);

export default router;