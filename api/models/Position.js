const { Model, DataTypes } = require('sequelize');
const { databaseConnection } = require('../config/db');


class Position extends Model {}

Position.init({
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.SMALLINT
    },
    title: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    

},{
    databaseConnection,
    tableName: 'position',
    modelName: 'Position'
})


databaseConnection.sync()

module.exports = {
    Position: Position
}