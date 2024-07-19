import {Sequelize} from "sequelize";
import db from "../config/Database.js";
import Student from "./StudentModel.js";

const {DataTypes} = Sequelize;

const Comic = db.define('comics',{
    student_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    url_comic:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    judul:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    status:{
        type: DataTypes.ENUM(["Ditolak", "Disetujui", "Proses Verifikasi"]),
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
})

Student.hasMany(Comic, { foreignKey: "student_id" });
Comic.belongsTo(Student, { foreignKey: "student_id" });

export default Comic;