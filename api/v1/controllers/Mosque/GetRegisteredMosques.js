const { Op } = require('sequelize');
const { Mosque } = require('../../../models/Mosque');

const GetRegisteredMosques = async(req, res) => {
    const { user_id } = req.body;
    if(user_id){
        return await Mosque.findAll({
            where: {
                still_exists: true,
                registered_by: user_id
            }
        })
        .then(data => {
            res.json({ response: data })
        })
        .catch(err => {
            res.json({ response: "Could not get registered mosques!" })
        })
    } else {
        return await Mosque.findAll({
            where: {
                still_exists: true,
                registered_by: {
                    [Op.not]: null
                }
            }
        })
        .then(data => {
            res.json({ response: data })
        })
        .catch(err => {
            res.json({ response: "Could not get registered mosques!" })
        })

    }
    
}


module.exports = {
    GetRegisteredMosques: GetRegisteredMosques
}