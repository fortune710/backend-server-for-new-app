const { Mosque } = require('../../../models/Mosque');
const { Op } = require('sequelize');


const GetAllMosques = async(req, res) => {
    const { longitude, latitude } = req.params;

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