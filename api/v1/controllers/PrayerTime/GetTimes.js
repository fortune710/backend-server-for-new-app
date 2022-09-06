const { Prayer } = require('../../../models/Prayer');
const { PrayerTime } = require('../../../models/PrayerTime');

const getPrayerTimes = async(req, res) => {
    const {mosque_id} = req.params;

    await PrayerTime.findAll({
        where: {
            mosque_id: mosque_id
        }
    })
    .then(data => {
        return res.json({ prayer_times: data })
    })
}

module.exports = {
    getPrayerTimes: getPrayerTimes
}