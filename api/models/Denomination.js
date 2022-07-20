const { Model, DataTypes } = require('sequelize');
const { databaseConnection } = require('../config/db');

class Denomination extends Model {}

Denomination.init({
    id: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(50)
    }
}, {
    databaseConnection,
    tableName: 'denomination',
    modelName: 'denomination'
})


databaseConnection.sync()

module.exports = {
    Denomination: Denomination
}