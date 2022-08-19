const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');


class Book extends Model {}

Book.init({
    id: {
        type: DataTypes.STRING(10),
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, 
{
    sequelize,
    tableName: 'book',
    modelName: 'Book'
})

sequelize.sync()

module.exports = {
    Book: Book
}