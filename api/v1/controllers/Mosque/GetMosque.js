const { Mosque } = require('../../../models/Mosque');

const GetMosque = async(req, res) => {
    if(req instanceof Request){
        const { id } = req.params;
        if(!id){
            res.json({ response:'Data missing!' })
            return
        } else {
            await Mosque.findByPk(id).then(data => res.json({ response: data }))
            .catch(() => res.json({ response:'Could not get mosque' }))
        }
    }
}
