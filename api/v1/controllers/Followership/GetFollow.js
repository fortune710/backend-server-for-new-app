const { Followership } = require('../../../models/Followership');
const { Op } = require('sequelize');
const { Mosque } = require('../../../models/Mosque');

const getMosque = async(mosque_id) => {
    const mosque = await Mosque.findByPk(mosque_id).
    then(res => {
        return res
    })

    return mosque
}

const GetFollow = async(req, res) => {
    const { id } = req.params;

    if(!req.params){
        res.json({ response: 'Data misssing!' })
        return
    } else {
        await Followership.findAll({
            where: {
                user_id: id
            }
        })
        .then(async(data) => {
            let promiseArray = data.map(item => (getMosque(item.mosque_id)))
            const mosques = await Promise.all(promiseArray)
            return res.json({ following: mosques })

        })
        .catch(()=>{
            res.json({ response: 'Error while reading table' })
        })
    }
}

module.exports = {
    GetFollow: GetFollow
}