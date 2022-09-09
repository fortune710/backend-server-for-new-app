const { Mosque } = require('../../../models/Mosque');
const { PrayerTime } = require('../../../models/PrayerTime');
const { Followership } = require('../../../models/Followership');
const { MosqueAdmins } = require('../../../models/MosqueAdmin');
const { MosqueBooks } = require('../../../models/MosqueBooks');
const { MosqueBookDay } = require('../../../models/MosqueBookDay');
const { Op } = require('sequelize');

const getAdmins = async(mosque_id) => {
    const admins = await MosqueAdmins.findAll({
        where: {
            mosque_id: mosque_id
        }
    })
    .then(data => { 
        if(data){
            return data
        } else {
            return []
        }
     })
    return admins
}

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

const getBooks = async (mosque_id) => {
    const books = await MosqueBooks.findAll({
        where: {
            mosque_id: mosque_id
        }
    })
    .then(res => {
        if(res !== null){
            return res
        } else {
            return []
        }
    })
    return books
}

const GetMosque = async(req, res) => {
    const { id } = req.params;
    const { user_id } = req.body;
    
    const prayers = await getPrayerTimes(id);
    const isFollowing = await checkIfUserIsFollowing(user_id, id)
    const admins = await getAdmins(id)
    const books = await getBooks(id)
    
    if(!id || !req.body){
        return res.json({ response:'Data missing!' })
    } else {
        return await Mosque.findByPk(id).then(data => {
            const mosqueData = {
                ...data.dataValues,
                is_following: isFollowing,
                prayer_times: prayers,
                admins: admins,
                books: books
            }
            res.json({ response: mosqueData })
        })
        .catch(() => res.json({ response:'Could not get mosque' }))
    }
}

module.exports = {
    GetMosque: GetMosque
}