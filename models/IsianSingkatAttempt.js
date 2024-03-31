import {Sequelize} from "sequelize";
import db from "../config/Database.js";
import IsianSingkat from "./IsianSingkatModel.js"
import Student from "./StudentModel.js"

const { DataTypes } = Sequelize;

const IsianSingkatAttempt = db.define('isian_singkat_attempts', {
    student_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    isian_singkat_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    jawaban:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    nilai:{
        type: DataTypes.FLOAT,
        allowNull: true
    }
})

IsianSingkatAttempt.belongsTo(IsianSingkat, {foreignKey: 'isian_singkat_id'});
IsianSingkatAttempt.belongsTo(Student, {foreignKey: 'student_id'});

export default IsianSingkatAttempt;