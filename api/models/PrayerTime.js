const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');


class PrayerTime extends Model {}

PrayerTime.init({
    prayer_id: {
        type: DataTypes.SMALLINT,
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
    sequelize,
    tableName: 'prayer-time',
    modelName: 'PrayerTime'
})


sequelize.sync()

module.exports = {
    PrayerTime: PrayerTime
}