import {Sequelize} from "sequelize";
import db from "../config/Database.js";
import Quizes from "./Quizes.js";

const {DataTypes} = Sequelize;

const IsianSingkat = db.define('isiansingkats', {
    quiz_isian_singkat_id:{
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

Quizes.hasMany(IsianSingkat);
IsianSingkat.belongsTo(Quizes,{
    foreignKey: 'quiz_isian_singkat_id',
    targetKey: 'isian_singkat_id'
})

export default IsianSingkat;