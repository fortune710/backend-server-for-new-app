const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

class Denomination extends Model {}

Denomination.init({
    id: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    tableName: 'denomination',
    modelName: 'Denomination'
})


sequelize.sync()

module.exports = {
    Denomination: Denomination
}