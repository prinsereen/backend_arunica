import {Sequelize} from "sequelize";
import db from "../config/Database.js";
import Subject from "./SubjectModel.js";

const {DataTypes} = Sequelize;

const Material = db.define('materials',{
    subject_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    material:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },    
})

Material.belongsTo(Subject, {foreignKey: 'subject_id'});

export default Material;
