const { Mosque } = require('../../../models/Mosque');

const GetPendingMosques = async(req, res) => {
    return await Mosque.findAll({
        where: {
            still_exists: true,
            registered_by: null
        },
        limit: 10
    })
    .then(data => {
        res.json({ response: data })
    })
    .catch(err => {
        res.json({ response: "Could not get pending mosques!" })
    })
}


module.exports = {
    GetPendingMosques: GetPendingMosques
}