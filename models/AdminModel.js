import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Admin = db.define('admins', {
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
    key:{
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
    profile_url:{
        type: DataTypes.STRING
    },
    refresh_token: {
        type: DataTypes.TEXT
    }   
})

export default Admin;
