const { Model, DataTypes } = require('sequelize');
const { databaseConnection } = require('../config/db');


class Mosque extends Model {}

Mosque.init({
    id: {
        primaryKey: true,
        type: DataTypes.STRING(20),
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    longitude: {
        type: DataTypes.FLOAT
    },
    latitude: {
        type: DataTypes.FLOAT
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    denomination: {
        type: DataTypes.STRING(40),
        allowNull: true
    }

},{
    databaseConnection,
    tableName: 'mosque',
    modelName: 'Mosque'
})


databaseConnection.sync()

module.exports = {
    Mosque: Mosque
}