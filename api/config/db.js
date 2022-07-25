const { Sequelize } = require('sequelize')
const DB_CONFIG = require('./variables')
require('dotenv').config()

const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USERNAME } = DB_CONFIG

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD , {
    host: DB_HOST,
    dialect: 'postgres',
    logging: false,
    ...(process.env.NODE_ENV === 'production' && {
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    })
})

sequelize.authenticate()


module.exports = {
    sequelize: sequelize
}