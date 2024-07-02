import express from "express"
import db from "./config/Database.js";
import cors from "cors"
import Student from "./models/StudentModel.js";
import Class from "./models/ClassModel.js";
import StudentClass from "./models/StudentClassModel.js";
import Subject from "./models/SubjectModel.js";
import Material from "./models/MaterialsModel.js";
import Teacher from "./models/TeacherModel.js";
import Admin from "./models/AdminModel.js";
import Quizes from "./models/QuizesModel.js";
import Pilgans from "./models/PilgansModel.js";
import IsianSingkat from "./models/IsianSingkatModel.js";
import Essai from "./models/EssaiModel.js"
import EssaiAttempt from "./models/EssaiAttemptModel.js";
import IsianSingkatAttempt from "./models/IsianSingkatAttempt.js";
import PilganAttempt from "./models/PilganAttemptModel.js";
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
import QuizRoute from "./routes/QuizRoute.js";
import PilganRoute from "./routes/PilganRoute.js";
import IsianSingkatRoute from "./routes/IsianSingkatRoute.js";
import EssaiRoute from "./routes/EssaiRoute.js"
import AttempPilganRoute from "./routes/PilganAttemptRoute.js"

dotenv.config();

const app = express();

try {
    await db.authenticate();
    console.log("Database Connected ...")
    await db.sync()
} catch (error) {
    console.log(error)
}

app.use(cors());
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
app.use(QuizRoute)
app.use(PilganRoute)
app.use(IsianSingkatRoute)
app.use(EssaiRoute)
app.use(AttempPilganRoute)

const port = process.env.PORT || 3000;

// Listen on `port` and 0.0.0.0
app.listen(port, "0.0.0.0", function () {
  console.log("server running on port", port)
});