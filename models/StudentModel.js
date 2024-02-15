import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Student = db.define('students', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    nisn:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true 
        }
    },    
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    grade:{
        type: DataTypes.CHAR(100)
    },
    class:{
        type: DataTypes.CHAR(100)
    },
    avg_quiz_score: {
        type: DataTypes.FLOAT
    },
    avg_read_score: {
        type: DataTypes.FLOAT
    },
    competiton_recomendation: {
        type: DataTypes.STRING
    },
    refresh_token: {
        type: DataTypes.TEXT
    }
}, {
    freezeTableName: true
})

export default Student;