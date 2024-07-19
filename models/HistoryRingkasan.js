import {Sequelize} from "sequelize";
import db from "../config/Database.js";
import Student from "./StudentModel.js";
import Buku from "./books.js";

const {DataTypes} = Sequelize;

const HistoryBacaan = db.define('history_bacaan',{
    student_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    buku_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    dari:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    sampai:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    pemahanan_siswa:{
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    kesesuaiaan_ringkasan:{
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    gen_ai_feedback:{
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    ringkasan:{
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    exp:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    }
})

HistoryBacaan.belongsTo(Buku, {foreignKey: 'buku_id'});
HistoryBacaan.belongsTo(Student, {foreignKey: 'student_id'});

export default HistoryBacaan;