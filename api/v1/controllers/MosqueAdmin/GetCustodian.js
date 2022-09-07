const { MosqueAdmins } = require('../../../models/MosqueAdmin');
const { Mosque } = require('../../../models/Mosque');


const GetMosques = async(mosque_id) => {
    const mosque = await Mosque.findByPk(mosque_id)
    .then(res => { return res })
    return mosque
}

const getCustodianForMosque = async(req, res) => {
    const { user_id } = req.params;

    if(!req.params){
        return res.status(400).json({ message: 'Route param user_id missing' })
    } else {
        await MosqueAdmins.findAll({
            where: {
                user_id: user_id
            }
        })
        .then(async(data) => {
            let mosques = []
            await Mosque.findByPk(data[0].mosque_id)
            .then((mosque) => {
                res.json({ mosque: mosque })
            })
        })
    }
}

module.exports = {
    GetCustodianWithMosque: getCustodianForMosque
}