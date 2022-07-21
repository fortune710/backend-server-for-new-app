const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

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
    sequelize,
    tableName: 'denomination',
    modelName: 'denomination'
})


sequelize.sync()

module.exports = {
    Denomination: Denomination
}