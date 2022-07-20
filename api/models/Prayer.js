const { Model, DataTypes } = require('sequelize');
const { databaseConnection } = require('../config/db');


class Prayer extends Model {}

Prayer.init({
    prayer_id: {
        primaryKey: true,
        type: DataTypes.SMALLINT,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
   

},{
    databaseConnection,
    tableName: 'Prayer',
    modelName: 'Prayer'
})


databaseConnection.sync()

module.exports = {
    Prayer: Prayer
}