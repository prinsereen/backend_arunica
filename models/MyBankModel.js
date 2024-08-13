import {Sequelize} from "sequelize";
import db from "../config/Database.js";
import Material from "./MaterialsModel.js";

const {DataTypes} = Sequelize;

const MyBank = db.define('mybanks',{
    material_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    url_sampul:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    url_buku:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    judul:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    }
})

Material.hasMany(MyBank, { foreignKey: "material_id" });
MyBank.belongsTo(Material, { foreignKey: "material_id" });

export default MyBank;