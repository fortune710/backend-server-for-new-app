const { Mosque } = require('../../../models/Mosque');

const GetRegisteredMosques = async(req, res) => {
    const { user_id } = req.params;
    
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
        res.json({ response: "Could not get pending mosques!" })
    })
}


module.exports = {
    GetRegisteredMosques: GetRegisteredMosques
}