const { MosqueAdmins } = require('../../../models/MosqueAdmin');
const { Mosque } = require('../../../models/Mosque');


const GetMosques = async(mosque_id) => {
    const mosque = await Mosque.findByPk(mosque_id)
    return mosque
}

const getCustodianForMosque = async(req, res) => {
    const { user_id } = req.params;

    if(!req.params){
        return res.status(400).json({ message: 'Route param user_id missing' })
    } else {
        await MosqueAdmins.findAll({
            user_id: user_id,
        })
        .then(data => {
            let mosques = []
            Promise.all(data.map(record => {
                GetMosques(record.mosque_id)
                .then(res => {
                    mosques = [...mosques, res]
                })
            }))
            .then(() => {
                return res.json({ mosques: mosques })
            })
        })
    }
}

module.exports = {
    GetCustodianWithMosque: getCustodianForMosque
}