import {Sequelize} from "sequelize";
import db from "../config/Database.js";
import Quizes from "./QuizesModel.js";

const { DataTypes } = Sequelize;

const Pilgans = db.define('pilgans', {
    quiz_pilgan_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    soal:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    pilihan_a:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    pilihan_b:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    pilihan_c:{
        type: DataTypes.STRING,
    },
    pilihan_d:{
        type: DataTypes.STRING,
    },
    jawaban_benar:{
        type: DataTypes.CHAR(2),
    }
})

Quizes.hasMany(Pilgans);
Pilgans.belongsTo(Quizes,{
    foreignKey: 'quiz_pilgan_id',
    targetKey: 'pilgan_id'
})

export default Pilgans;