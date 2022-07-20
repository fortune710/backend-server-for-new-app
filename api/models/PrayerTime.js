const { Model, DataTypes } = require('sequelize');
const { databaseConnection } = require('../config/db');


class PrayerTime extends Model {}

PrayerTime.init({
    prayer_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    mosque_id: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    call_time: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    start_time: {
        type: DataTypes.TIME,
        allowNull: false,
    }

   

},{
    databaseConnection,
    tableName: 'prayer-time',
    modelName: 'PrayerTime'
})


databaseConnection.sync()

module.exports = {
    PrayerTime: PrayerTime
}