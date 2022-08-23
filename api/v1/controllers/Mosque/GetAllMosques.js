const { Mosque } = require('../../../models/Mosque');
const { Op } = require('sequelize');


const GetAllMosques = async(req, res) => {
    const { longitude, latitude } = req.params;

    await Mosque.findAll()
    .then(data => {
        return res.json({ response: data })
    })
    .catch(err => {
        return res.json({ response: "Could not get all mosques!" })
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