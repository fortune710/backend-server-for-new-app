const { Mosque } = require('../../../models/Mosque');
const { makeid } = require('../../../../helpers/randomid');
const {MosqueAccount} = require('../../../models/MosqueAccount');
const { getPrayerTimes } = require('../../controllers/PrayerTime/GetTimes')


const MosqueLogin = async(req, res) => {

    const { email, password } = req.body;
    if(!req.body){
        res.json({ response:'Data missing!' })
        return
    } else {
        await MosqueAccount.findOne({
            where: {
                email: email,
                password: password
            }
        }) 
        .then(async(data) => {
            try{
                const mosque = await Mosque.findByPk(data.mosque_id)
                const times = await getPrayerTimes(data.mosque_id);
                return res.json({ response: {...mosque.dataValues, prayers: times} })
            } catch(err) {
                return res.json({ response: "Could not get Mosque Information" })
            }
        })       

    }

}

module.exports = {
    MosqueLogin: MosqueLogin
}