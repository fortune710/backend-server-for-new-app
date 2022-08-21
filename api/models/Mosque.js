const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');


class Mosque extends Model {}

Mosque.init({
    id: {
        primaryKey: true,
        type: DataTypes.STRING(20),
    },
    name: {
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
        allowNull: true
    },
    imam_name: {
        type: DataTypes.STRING
    },
    phone_number: {
        type: DataTypes.STRING
    },
    registered_by: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true
    },
    still_exists: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }

},{
    sequelize,
    tableName: 'mosque',
    modelName: 'Mosque'
})


sequelize.sync()

module.exports = {
    Mosque: Mosque
}