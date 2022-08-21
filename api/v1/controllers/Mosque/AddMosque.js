const { Mosque } = require('../../../models/Mosque');
const { makeid } = require('../../../../helpers/randomid');
const {MosqueAccount} = require('../../../models/MosqueAccount');

async function checkIfEmailExists(email){
    const exists = await MosqueAccount.count({
        where: {
            email: email
        }
    })
    .then(res => {
        if(res > 0)
            return true
        else
            return false
    })
    return exists
}


const AddMosque = async(req, res) => {

    const { email, password, name, longitude, latitude, registered_by } = req.body;
    const { imam_name, address, denomination, phone_number } = req.body;
    
    const emailExists = await checkIfEmailExists(email)
    if(!req.body){
        res.json({ response:'Data missing!' })
        return
    } else if(emailExists){
        return res.json({ response: "Email already in use" })
    } else {
        await Mosque.create({
            id: makeid(20),
            name: name,
            address: address,
            longitude: longitude,
            latitude: latitude,
            imam_name: imam_name,
            denomination: denomination,
            phone_number: phone_number,
            registered_by: registered_by
        })
        .then(async(data) => {
            res.json({ response:data })
            await MosqueAccount.create({
                mosque_id: data.id,
                email: email,
                password: password
            })
        })
        .catch(() => res.json({ response:'Error while adding mosque!', body: req.body }))
    }

}

module.exports = {
    AddMosque: AddMosque
}