import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Teacher = db.define('teachers',{
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
    nip:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true 
        }
    },    
})


export default Teacher;
