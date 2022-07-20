const { Model, DataTypes } = require('sequelize');
const { databaseConnection } = require('../config/db');


class MosqueAdmins extends Model {}

MosqueAdmins.init({
    user_id: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    mosque_id: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    position: {
        type: DataTypes.BIGINT, //May change this to integer
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
    

},{
    databaseConnection,
    tableName: 'mosque-admin',
    modelName: 'MosqueAdmin'
})


databaseConnection.sync()

module.exports = {
    MosqueAdmins: MosqueAdmins
}