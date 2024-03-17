import express from "express";
import { getAllMappingStudentClass, createOneStudentClass, mappingFromExcel } from "../controllers/StudentClass.js";
import { verifyTokenAdmin } from "../middleware/verifyTokenAdmin.js";
import { verifyTeacherAdmin } from "../middleware/VerifyAccses.js";
import multer from "multer";

const upload = multer({dest: "uploads/"})
const router = express.Router();

router.post('/mapping/many', verifyTokenAdmin, upload.single("workbook"), mappingFromExcel);
router.post('/mapping', verifyTokenAdmin, createOneStudentClass);
router.get('/mapping', verifyTeacherAdmin, getAllMappingStudentClass);

export default router;
