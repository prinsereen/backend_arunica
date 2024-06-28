import {Sequelize} from "sequelize";
import db from "../config/Database.js";
import Class from "./ClassModel.js";
import Material from "./MaterialsModel.js";

const { DataTypes } = Sequelize;

const Quizes = db.define('quizes',{
    class_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    materials_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
})

Quizes.belongsTo(Class, {foreignKey: 'class_id'});
Quizes.belongsTo(Material, {foreignKey: 'materials_id'});


export default Quizes;