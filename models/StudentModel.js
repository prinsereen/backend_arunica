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
        type: DataTypes.INTEGER,
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
    url_photo:{
        type: DataTypes.STRING,
    },
    points:{
        type: DataTypes.INTEGER,
    },
    grade:{
        type: DataTypes.CHAR(100)
    },
    class:{
        type: DataTypes.CHAR(100)
    },
    math_activities:{
        type: DataTypes.INTEGER,
    },    
    ipa_activities:{
        type: DataTypes.INTEGER,
    },    
    pkn_activities:{
        type: DataTypes.INTEGER,
    },    
    literasi_activities:{
        type: DataTypes.INTEGER,
    },    
    ips_activities:{
        type: DataTypes.INTEGER,
    },    
    bindo_activities:{
        type: DataTypes.INTEGER,
    },    
    bing_activities:{
        type: DataTypes.INTEGER,
    },    
    senbud_activities:{
        type: DataTypes.INTEGER,
    },    
    refresh_token: {
        type: DataTypes.TEXT
    }
}, {
    freezeTableName: true
})

export default Student;