const { Mosque } = require('../../../models/Mosque');
const { PrayerTime } = require('../../../models/PrayerTime');
const { Op } = require('sequelize');
const { convertISOToTime } = require('../../../../helpers/isototime');

const getUpcomingPrayerTimes = async (mosque_id) => {
    const currentTime = convertISOToTime(new Date().toISOString())

    const times = await PrayerTime.findAll({
        where: {
            mosque_id: mosque_id, 
            start_time: {
                [Op.gt]: currentTime
            }
        }
    })
    .then(res => {
        return res
    })
    return times
}


const GetAllMosques = async(req, res) => {
    const { longitude, latitude } = req.params;

    return await Mosque.findAll()
    .then(async(data) => {
        const upcomingPrayers = await getUpcomingPrayerTimes()
        const apiResponse = {
            ...data.dataValues,
            upcoming_prayers: upcomingPrayers
        }
        res.json({ response: apiResponse })
    })
    .catch(err => {
        res.json({ response: "Could not get all mosques!" })
    })

    /*
    if(longitude && latitude){
        return
    } else if((!longitude&&latitude)||(longitude&&!latitude)){
        return res.json({ response: "One coordinate is missing" })
    } else {
        
    }*/
}


module.exports = {
    GetAllMosques: GetAllMosques
}