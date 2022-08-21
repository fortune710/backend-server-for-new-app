const { Mosque } = require('../../../models/Mosque');


const ApproveMosque = async(req, res) => {
    const { mosque_id, user_id } = req.body

    if(!mosque_id){
        res.json({ response:'Mosque Id missing or incorrectly spelled in request body' })
        return
    } else {
        await Mosque.update({
            registered_by: user_id
        }, {
            where: {
                id: mosque_id
            }
        })
        .then(() => res.json({ response:'Mosque updated successfully!' }))
        .catch(() => res.json({ response: 'There was a problem updating the mosque detials!'}))
    }

}

module.exports = {
    ApproveMosque: ApproveMosque
}