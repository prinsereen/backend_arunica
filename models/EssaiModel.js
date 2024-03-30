import {Sequelize} from "sequelize";
import db from "../config/Database.js";
import Quizes from "./QuizesModel.js";

const {DataTypes} = Sequelize;

const Essai = db.define('essais', {
    tipe:{
        type: DataTypes.ENUM("text", "pict"),
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
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
    }
})

Quizes.hasMany(Essai, {foreignKey: "quiz_id"});

export default Essai;