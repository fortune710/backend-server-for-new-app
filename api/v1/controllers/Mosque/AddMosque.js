const { Mosque } = require('../../../models/Mosque');
const { makeid } = require('../../../../helpers/randomid');
const {MosqueAccount} = require('../../../models/MosqueAccount');
const { PrayerTime } = require('../../../models/PrayerTime');

async function checkIfEmailExists(email){
    const exists = await MosqueAccount.count({
        where: {
            email: email
        }
    })
    .then(res => {
        if(res > 0)
            return true
        else
            return false
    })
    return exists
}

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


const AddMosque = async(req, res) => {

    const { name, longitude, latitude, registered_by } = req.body;
    const { imam_name, address, denomination, phone_number, prayers } = req.body;

    const { fajr, maghrib, isha, asr, dhuhr, jumaat } = prayers

    
    const emailExists = await checkIfEmailExists(email)
    if(!req.body){
        res.json({ response:'Data missing!' })
        return
    } else if(emailExists){
        return res.json({ response: "Email already in use" })
    } else {
        await Mosque.create({
            id: makeid(20),
            name: name,
            address: address,
            longitude: longitude,
            latitude: latitude,
            imam_name: imam_name,
            denomination: denomination,
            phone_number: phone_number,
            registered_by: registered_by
        })
        .then(async(data) => {
            const prayerTimes = await Promise.all([ setPrayerObject(fajr, data.id), setPrayerObject(maghrib, data.id), 
                setPrayerObject(isha, data.id), setPrayerObject(asr, data.id),
                setPrayerObject(dhuhr, data.id), setPrayerObject(jumaat, data.id) ])
                .then(data => { return data })
            
            const mosqueData = {
                ...data.dataValues,
                prayers: prayerTimes
            }

            return res.json({ response: mosqueData })
        })
        .catch(() => res.json({ response:'Error while adding mosque!', body: req.body }))
    }

}

module.exports = {
    AddMosque: AddMosque
}