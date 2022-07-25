const { Sequelize } = require('sequelize')
import { DB_CONFIG } from './variables'

const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USERNAME } = DB_CONFIG

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD , {
    host: DB_HOST,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
})



module.exports = {
    sequelize: sequelize
}