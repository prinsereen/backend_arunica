import {Sequelize} from "sequelize";
import db from "../config/Database.js";
import Student from "./StudentModel.js";
import Class from "./ClassModel.js";

const {DataTypes} = Sequelize;

const StudentClass = db.define('student_class',{
    student_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    class_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    }
})

StudentClass.belongsTo(Student, {foreignKey: 'student_id'});
StudentClass.belongsTo(Class, {foreignKey: 'class_id'});

export default StudentClass;