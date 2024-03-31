import {Sequelize} from "sequelize";
import db from "../config/Database.js";
import Pilgan from "./PilgansModel.js"
import Student from "./StudentModel.js"

const { DataTypes } = Sequelize;

const PilganAttempt = db.define('pilgan_attempts', {
    student_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    pilgan_id:{
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

PilganAttempt.belongsTo(Pilgan, {foreignKey: 'pilgan_id'});
PilganAttempt.belongsTo(Student, {foreignKey: 'student_id'});

export default PilganAttempt;