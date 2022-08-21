const { Mosque } = require('../../../models/Mosque');

const GetMosque = async(req, res) => {
    const { id } = req.params;
    if(!id){
        res.json({ response:'Data missing!' })
        return
    } else {
        return await Mosque.findByPk(id).then(data => res.json({ response: data }))
        .catch(() => res.json({ response:'Could not get mosque' }))
    }
}

module.exports = {
    GetMosque: GetMosque
}