const { Sequelize } = require('sequelize')


const DB_CONFIG = {
    database: 'backend-server',
    username: 'root',
    password: ''
}
const sequelize = new Sequelize('backend-server', 'root','' , {
    host:'localhost',
    dialect: 'mysql',
    logging: false
})


module.exports = {
    sequelize: sequelize
}