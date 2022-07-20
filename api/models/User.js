const { Model, DataTypes } = require('sequelize');
const { databaseConnection } = require('../config/db');


class User extends Model {}

User.init({
    id: {
        primaryKey: true,
        type: DataTypes.STRING(15)
    },
    fname:{
        type: DataTypes.STRING,
    },
    lname:{
        type: DataTypes.STRING,
    },
    password:{
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
    },
    type:{ //Admin, Custodian, or regular user
        type: DataTypes.SMALLINT,
    },
    user_id: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    profile_pic:{ //Profile pucture is either a base64 string or a URL
        type: DataTypes.STRING,
    },
},{
    databaseConnection,
    tableName: 'user',
    modelName: 'User'
})

databaseConnection.sync()

module.exports = {
    User: User
}