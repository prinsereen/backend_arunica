import express from "express";
import { register, login, logout, getMe} from "../controllers/AuthAdmin.js"
import { refreshTokenAdmin } from "../controllers/RefreshToken.js";
import { Register, Login } from "../validation/AuthAdminValidation.js";
import { verifyTokenAdmin } from "../middleware/verifyTokenAdmin.js";


const router = express.Router();

router.post('/admin/register', Register, register)
router.post('/admin/login', Login, login)
router.get('/admin/token', refreshTokenAdmin)
router.get('/admin/me', verifyTokenAdmin, getMe)
router.delete('/admin/logout', logout)

export default router;