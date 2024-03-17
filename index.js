import express from "express"
import db from "./config/Database.js";
import Student from "./models/StudentModel.js";
import Class from "./models/classModel.js";
import StudentClass from "./models/StudentClassModel.js";
import Subject from "./models/SubjectModel.js";
import Material from "./models/MaterialsModel.js";
import Teacher from "./models/TeacherModel.js";
import Admin from "./models/AdminModel.js";
import bodyParser from "body-parser";
import AuthRoute from "./routes/AuthRoute.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import StudentRoute from "./routes/StudentRoute.js"
import AuthAdminRoute from "./routes/AuthAdminRoute.js"
import AuthTeacherRoute from "./routes/AuthTeacherRoute.js"
import SubjectRoute from "./routes/SubjetRoute.js"
import ClassRoute from "./routes/ClassRoute.js"
import StudentClassRoute from "./routes/StudentClassRoute.js"
import GenAIRoute from "./routes/GenAIRoute.js";
import MaterialRoute from "./routes/MaterialRoute.js";

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
app.use(AuthTeacherRoute)
app.use(AuthAdminRoute)
app.use(SubjectRoute)
app.use(ClassRoute)
app.use(StudentClassRoute)
app.use(GenAIRoute)
app.use(MaterialRoute)

app.listen(5000, ()=> console.log("server running on port 5000"))