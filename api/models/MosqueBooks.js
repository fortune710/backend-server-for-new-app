const { Model, DataTypes } = require("sequelize");
const { sequelize } = require('../config/db');

class MosqueBooks extends Model {}

MosqueBooks.init({
    id: {
        type: DataTypes.STRING(10),
        primaryKey: true,
        allowNull: false
    },
    book_id: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    mosque_id: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    start_time: {
        type: DataTypes.TIME
    },
    stop_time: {
        type: DataTypes.TIME
    },
    has_finished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, 
{
    sequelize,
    tableName: 'mosque-books',
    modelName: 'MosqueBooks'
})

sequelize.sync()

module.exports = {
    MosqueBooks: MosqueBooks
}