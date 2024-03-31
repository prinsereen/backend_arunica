import {Sequelize} from "sequelize";
import db from "../config/Database.js";
import Essai from "./EssaiModel.js";
import Student from "./StudentModel.js"

const { DataTypes } = Sequelize;

const EssaiAttempt = db.define('essai_attempts', {
    student_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    essai_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    url_jawaban:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    nilai:{
        type: DataTypes.FLOAT,
        allowNull: true
    }
})

EssaiAttempt.belongsTo(Essai, {foreignKey: 'essai_id'});
EssaiAttempt.belongsTo(Student, {foreignKey: 'student_id'});

export default EssaiAttempt;