const { PrayerTime } = require('../../../models/PrayerTime');

async function setPrayerObject(prayer, mosque_id){
    const { id, time } = prayer;
    const object = {
        prayer_id: id,
        mosque_id: mosque_id,
        start_time: time.iqama,
        call_time: time.azan
    }
    return await PrayerTime.create(object)
}

const AddTime = async(req, res) => {
    const { prayers, mosque_id } = req.body;
    const { fajr, maghrib, isha, asr, dhuhr, jumaat } = prayers
    
   
    
    Promise.all([ setPrayerObject(fajr, mosque_id), setPrayerObject(maghrib, mosque_id), 
        setPrayerObject(isha, mosque_id), setPrayerObject(asr, mosque_id),
        setPrayerObject(dhuhr, mosque_id), setPrayerObject(jumaat, mosque_id) ])
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