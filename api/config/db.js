const { Sequelize } = require('sequelize')

const connection = new Sequelize({
    database: 'users',
    dialect: 'mysql',
    logging: false
})


module.exports = {
    databaseConnection: connection
}