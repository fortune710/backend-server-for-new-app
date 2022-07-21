const { PrayerTime } = require('../../../models/PrayerTime');

const UpdateTime = async(req, res) => {
    const { mosque_id, prayer_id } = req.body;

    await PrayerTime.update({
        ...req.body
    }, {
        where: {
            mosque_id: mosque_id,
            prayer_id: prayer_id
        }
    })
    .then(data => {
        res.json({
            response: data,
            message: 'Prayer time updated sucessfully'
        })
    })
    .catch(() => res.json({ response: 'Error while updating prayer time' }))
}

module.exports = {
    UpdateTime: UpdateTime
}