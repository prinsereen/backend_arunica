import {Sequelize} from "sequelize";

const db = new Sequelize('arunica_db_baru', 'root', '', {
    host: "localhost",
    dialect: "mysql",
})

export default db;