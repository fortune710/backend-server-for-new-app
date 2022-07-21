const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');


class Prayer extends Model {}

Prayer.init({
    prayer_id: {
        primaryKey: true,
        type: DataTypes.SMALLINT,
        autoIncrement: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
   

},{
    sequelize,
    tableName: 'Prayer',
    modelName: 'Prayer'
})

//Create the different prayers

sequelize.sync()

module.exports = {
    Prayer: Prayer
}