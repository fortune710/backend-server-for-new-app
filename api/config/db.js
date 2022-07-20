const { Sequelize } = require('sequelize')


const DB_CONFIG = {
    database: 'backend-server',
    username: 'root',
    password: ''
}
const connection = new Sequelize(...DB_CONFIG,{
    host:'localhost',
    dialect: 'mysql',
    logging: false
})


module.exports = {
    databaseConnection: connection
}