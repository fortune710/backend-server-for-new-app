const { Sequelize } = require('sequelize')
const DB_CONFIG = require('./variables')
require('dotenv').config()


/*
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
*/

const databaseConfig = {
    databaseName: 'sql5513562',
    username: 'sql5513562',
    password: 'YiICPYrllR',
    host: 'sql5.freesqldatabase.com',
    port: '3306'
}

const sequelize = new Sequelize(databaseConfig.databaseName, databaseConfig.username, databaseConfig.password, {
    host: databaseConfig.host,
    dialect: 'mysql',
    port: databaseConfig.port
})

sequelize.authenticate()


module.exports = {
    sequelize: sequelize
}