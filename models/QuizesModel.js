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
    },
    durasi: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    total_attempt:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    total_exp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    thumbnail_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    deskripsi: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    jumlah_pilihan_ganda: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    skor_pilgan:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    jumlah_isian_singkat: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    skor_isian_singkat:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    jumlah_esai: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    skor_esai:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
})

Quizes.belongsTo(Class, {foreignKey: 'class_id'});
Quizes.belongsTo(Material, {foreignKey: 'materials_id'});


export default Quizes;