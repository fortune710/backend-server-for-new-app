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
    databaseName: 'iqama_db',
    username: 'admin',
    password: 'Fortune2003',
    host: 'iqama-db.ctf1cjupbaww.us-east-1.rds.amazonaws.com',
    port: '3306'
}

let sequelize = undefined;

if(process.env.NODE_ENV === 'dev'){
    sequelize = new Sequelize('backend-server', 'root', '', {
        dialect: 'mysql',
        host: 'localhost',
        dialectModule: require('mysql2')

    })
} else {
    sequelize = new Sequelize(databaseConfig.databaseName, databaseConfig.username, databaseConfig.password, {
        host: databaseConfig.host,
        dialect: 'mysql',
        port: databaseConfig.port,
        dialectModule: require('mysql2')
    })
    //added comment
}


sequelize.authenticate()


module.exports = {
    sequelize: sequelize
}