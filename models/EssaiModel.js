import {Sequelize} from "sequelize";
import db from "../config/Database.js";
import Quizes from "./Quizes.js";

const {DataTypes} = Sequelize;

const Essai = db.define('essais', {
    quiz_essai_id:{
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
    },
    urlJawaban:{
        type: DataTypes.STRING,
    }
})

Quizes.hasMany(Essai);
Essai.belongsTo(Quizes,{
    foreignKey: 'quiz_essai_id',
    targetKey: 'essai_id'
})

export default IsianSingkat;