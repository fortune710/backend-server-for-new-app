const { Mosque } = require('../../../models/Mosque');
const { makeid } = require('../../../../helpers/randomid');

const AddMosque = async(req, res) => {

    if(!req.body){
        res.json({ response:'Data missing!' })
        return
    } else {
        await Mosque.create({
            id: makeid(20),
            ...req.body
        })
        .then(data => res.json({ response:data }))
        .catch(() => res.json({ response:'Error while adding mosque!' }))
    }

}

module.exports = {
    AddMosque: AddMosque
}