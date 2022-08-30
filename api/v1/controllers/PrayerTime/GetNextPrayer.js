const { PrayerTime } = require('../../../models/PrayerTime');
const { convertISOToTime } = require('../../../../helpers/isototime')

const getNextPrayerTimes = async (req, res) => {
    const { mosque_id } = req.body;
    const date = convertISOToTime(new Date().toISOString())

    try {
        return await PrayerTime.findAll({
            where: {
                mosque_id: mosque_id
            }
        })
        .then(prayers => {
            const nextPrayer = prayers.filter(prayer => date < prayer.time)
            if(nextPrayer.length === 0){
                res.json({ next_prayer: { 
                    id: prayers[0].prayer_id, 
                    start_time: prayers[0].start_time,
                    call_time: prayers[0].call_time } 
                })
            } else {
                res.json({ next_prayer: { 
                    id: nextPrayer[0].prayer_id, 
                    start_time: nextPrayer[0].start_time,
                    call_time: nextPrayer[0].call_time } 
                })
            }

        })
    } catch (err) {
        return []
    }
}

module.exports = {
    GetNextPrayer: getNextPrayerTimes
}