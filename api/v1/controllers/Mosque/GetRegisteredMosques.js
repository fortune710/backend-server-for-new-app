const { Op } = require('sequelize');
const { Mosque } = require('../../../models/Mosque');
const { isPointWithinRadius } = require('geolib');

const checkIfPointIsWithinRadius = async(userCoordinates, mosque) => {
    const mosqueCoords = { latitude: mosque.latitude, longitude: mosque.longitude }
    const coords = isPointWithinRadius(mosqueCoords, userCoordinates, 10000)
    if(coords){
        return mosque
    } else {
        return
    }
}

const GetRegisteredMosques = async(req, res) => {
    const { user_id, latitude, longitude } = req.body;
    const userCoordinates = { latitude: latitude, longitude: longitude };

    if(user_id){
        return await Mosque.findAll({
            where: {
                still_exists: true,
                registered_by: user_id
            }
        })
        .then(data => {
            return res.json({ response: data })
        })
        .catch(err => {
            return res.json({ response: "Could not get registered mosques!" })
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
            if(latitude && longitude){
                let closeByMosques = []
                Promise.all(data.map((mosque) => {
                    checkIfPointIsWithinRadius(userCoordinates, mosque)
                    .then(data => { 
                        closeByMosques = [...closeByMosques, data]
                     })
                }))
                .then(() => {
                    return res.json({ close_by_mosques: closeByMosques.filter(el => el != null) })
    
                })
            } else {
                return res.json({ all_mosques: data })
            }
        })
        .catch(err => {
            res.json({ response: "Could not get registered mosques!" })
        })

    }
    
}


module.exports = {
    GetRegisteredMosques: GetRegisteredMosques
}