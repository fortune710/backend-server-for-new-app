const { Mosque } = require('../../../models/Mosque');
const { PrayerTime } = require('../../../models/PrayerTime');
const { Followership } = require('../../../models/Followership');
const { Op } = require('sequelize');


const checkIfUserIsFollowing = async(user_id, mosque_id) => { // Should return false if user is not following

    const isFollowing = await Followership.findOne({
        where: {
            [Op.and]: [
                { user_id: user_id },
                { mosque_id: mosque_id }
            ]
        }
    })
    .then(data => {
        if(data === null)
            return false
        else 
            return true
    })
    return isFollowing;
}


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
    const { user_id, mosque_id } = req.body;
    const prayers = await getPrayerTimes(id);
    const isFollowing = await checkIfUserIsFollowing(user_id, mosque_id)

    if(!id || !req.body){
        return res.json({ response:'Data missing!' })
    } else {
        return await Mosque.findByPk(id).then(data => {
            const mosqueData = {
                ...data.dataValues,
                is_following: isFollowing,
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