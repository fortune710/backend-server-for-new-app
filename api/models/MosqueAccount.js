const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');


class MosqueAccount extends Model {}

MosqueAccount.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    mosque_id: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING
    },
},
{
    sequelize,
    tableName: 'mosque-account',
    modelName: 'MosqueAccount'
})

sequelize.sync()

module.exports = {
    MosqueAccount: MosqueAccount
}