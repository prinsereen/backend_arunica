import {Sequelize} from "sequelize";
import db from "../config/Database.js";
import Quizes from "./QuizesModel.js";

const {DataTypes} = Sequelize;

const IsianSingkat = db.define('isiansingkats', {
    quiz_id:{
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
    jawaban:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
})

Quizes.hasMany(IsianSingkat, {foreignKey: "quiz_id"});

export default IsianSingkat;