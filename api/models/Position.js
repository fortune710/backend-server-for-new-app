const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');


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
    sequelize,
    tableName: 'position',
    modelName: 'Position'
})


sequelize.sync()

module.exports = {
    Position: Position
}