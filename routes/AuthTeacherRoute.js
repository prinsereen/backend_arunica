import express from "express";
import { register, login, logout, getMe} from "../controllers/AuthTeacher.js"
import { refreshTokenTeacher } from "../controllers/RefreshToken.js";
import { Register, Login } from "../validation/AuthTeacherValidation.js";
import { verifyTokenTeacher } from "../middleware/verifyTokenTeacher.js";


const router = express.Router();

router.post('/teacher/register', Register, register)
router.post('/teacher/login', Login, login)
router.get('/teacher/token', refreshTokenTeacher)
router.get('/teacher/me', verifyTokenTeacher, getMe)
router.delete('/teacher/logout', logout)

export default router;