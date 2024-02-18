import express from "express"
import db from "./config/Database.js";
import Student from "./models/StudentModel.js";
import Class from "./models/classModel.js";
import StudentClass from "./models/StudentClassModel.js";
import Subject from "./models/SubjectModel.js";
import Material from "./models/MaterialsModel.js";
import Teacher from "./models/TeacherModel.js";
import bodyParser from "body-parser";
import AuthRoute from "./routes/AuthRoute.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import StudentRoute from "./routes/StudentRoute.js"

dotenv.config();

const app = express();

try {
    await db.authenticate();
    console.log("Database Connected ...")
    //await db.sync()
} catch (error) {
    console.log(error)
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser())
app.use(express.json())
app.use(AuthRoute)
app.use(StudentRoute)

app.listen(5000, ()=> console.log("server running on port 5000"))