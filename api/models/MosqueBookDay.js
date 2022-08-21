const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');


class MosqueBookDay extends Model {}

MosqueBookDay.init({
    id: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false
    },
    book_id: {
        type: DataTypes.STRING
    },
    mosque_id: {
        type: DataTypes.STRING
    },
    day: { //Day of the week in digit
        type: DataTypes.SMALLINT
    }
}, 
{
    sequelize,
    tableName: 'mosque-book-day',
    modelName: 'MosqueBookDay'
})


sequelize.sync()


module.exports = {
    MosqueBookDay: MosqueBookDay
}
