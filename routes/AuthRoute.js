import express from "express";
import {register, login, logout, getMe, getProfileName} from "../controllers/Auth.js"
import { refreshToken } from "../controllers/RefreshToken.js";
import { Register, Login } from "../validation/AuthValidation.js";
import { verifyToken } from "../middleware/verifyToken.js";


const router = express.Router();

router.post('/register', Register, register)
router.post('/login', Login, login)
router.get('/token', refreshToken)
router.get('/me', verifyToken, getMe)
router.get('/navbar', verifyToken, getProfileName)
router.delete('/logout', logout)

export default router;