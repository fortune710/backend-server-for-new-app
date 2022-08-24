const { Mosque } = require('../../../models/Mosque');
const { PrayerTime } = require('../../../models/PrayerTime');


const getPrayerTimes = async (id) => {
    try {
        return await PrayerTime.findAll({
            where: {
                mosque_id: id
            }
        })
    } catch (err) {
        return []
    }
}

const GetMosque = async(req, res) => {
    const { id } = req.params;
    const prayers = await getPrayerTimes(id);

    if(!id){
        res.json({ response:'Data missing!' })
        return
    } else {
        return await Mosque.findByPk(id).then(data => {
            const mosqueData = {
                ...data.dataValues,
                prayer_times: prayers
            }
            res.json({ response: mosqueData })
        })
        .catch(() => res.json({ response:'Could not get mosque' }))
    }
}

module.exports = {
    GetMosque: GetMosque
}