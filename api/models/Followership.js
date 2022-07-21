const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');


class Followership extends Model {}

Followership.init({
    user_id: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    mosque_id: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING(10), 
        allowNull: false
    },


},{
    sequelize,
    tableName: 'followership',
    modelName: 'Followership'
})


sequelize.sync()

module.exports = {
    Followership: Followership
}