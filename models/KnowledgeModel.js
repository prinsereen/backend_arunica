import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Material from "./MaterialsModel.js";// Ensure this import path is correct

const { DataTypes } = Sequelize;

const Knowledge = db.define('knowledges', {
    material_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    type: {
        type: DataTypes.ENUM(['read', 'bank', 'tutor', 'quick']),
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },    
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    judul: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
});

// Define associations
Material.hasMany(Knowledge, { foreignKey: "material_id" });
Knowledge.belongsTo(Material, { foreignKey: "material_id" });

export default Knowledge;
