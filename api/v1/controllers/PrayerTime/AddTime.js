const { PrayerTime } = require('../../../models/PrayerTime');

const AddTime = async(req, res) => {
    const { prayer_id, mosque_id, call_time, start_time } = req.body;
    await PrayerTime.create({
        prayer_id: prayer_id,
        mosque_id: mosque_id,
        call_time: call_time,
        start_time: start_time
    })
    .then(data => {
        res.json({
            response: data,
            message: 'Prayer Time added sucessfully',
        })
    })
    .catch(() => {
        res.json({ response: 'Problem while adding prayer time!' })
    })
}

module.exports = {
    AddTime: AddTime
}