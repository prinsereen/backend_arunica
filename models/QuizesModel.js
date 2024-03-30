import {Sequelize} from "sequelize";
import db from "../config/Database.js";
import Class from "./classModel.js";
import Material from "./MaterialsModel.js";

const { DataTypes } = Sequelize;

const Quizes = db.define('quizes',{
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        primaryKey: true,
        autoIncrement: true
    },
    pilgan_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        primaryKey: true
    },
    isian_singkat_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        primaryKey: true
    },
    essai_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        primaryKey: true
    },
    tipe_essai:{
        type: DataTypes.ENUM("text", "pict"),
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
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


/* // Define a function to generate auto-increment IDs
async function generateAutoIncrementId(fieldName) {
    const maxRecord = await Quizes.max(fieldName);
    return (maxRecord || 0) + 1;
}

// Hook into beforeCreate lifecycle to generate auto-increment IDs
Quizes.beforeCreate(async (instance, options) => {
    instance.quiz_pilgan_id = await generateAutoIncrementId('quiz_pilgan_id');
    instance.quiz_isian_singkat_id = await generateAutoIncrementId('quiz_isian_singkat_id');
    instance.quiz_essai_id = await generateAutoIncrementId('quiz_essai_id');
}); */

Quizes.belongsTo(Class, {foreignKey: 'class_id'});
Quizes.belongsTo(Material, {foreignKey: 'materials_id'});


export default Quizes;