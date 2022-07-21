const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');


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
    profile_pic:{ //Profile pucture is either a base64 string or a URL
        type: DataTypes.STRING,
    },
},{
    sequelize,
    tableName: 'user',
    modelName: 'User'
})

sequelize.sync()

module.exports = {
    User: User
}