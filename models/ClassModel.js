import {Sequelize} from "sequelize";
import db from "../config/Database.js";
import Teacher from "./TeacherModel.js";
import Subject from "./SubjectModel.js";

const {DataTypes} = Sequelize;

const Class = db.define('classes',{
    teacher_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    subject_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    nama_kelas:{
        type: DataTypes.STRING,
    }
})

Class.belongsTo(Teacher, {foreignKey: 'teacher_id'});
Class.belongsTo(Subject, {foreignKey: 'subject_id'});

export default Class;