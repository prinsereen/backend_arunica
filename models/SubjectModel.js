import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Subject = db.define('subjects',{
    subject_name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    subject_grade:{
        type: DataTypes.CHAR(100)
    },    
})


export default Subject;
