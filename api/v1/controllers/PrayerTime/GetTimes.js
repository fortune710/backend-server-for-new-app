const { Prayer } = require('../../../models/Prayer');
const { PrayerTime } = require('../../../models/PrayerTime');

const getPrayerTimes = async(mosque_id) => {
    const times = await PrayerTime.findAll({
        where: {
            mosque_id: mosque_id
        }
    })
    .then(data => {
        return data
    })
    return times
}

module.exports = {
    getPrayerTimes: getPrayerTimes
}