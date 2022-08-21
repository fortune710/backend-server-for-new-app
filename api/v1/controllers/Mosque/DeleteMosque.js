const { Mosque } = require('../../../models/Mosque');


const DeleteMosque = async(req, res) => {
    const { mosque_id } = req.body

    if(!mosque_id){
        res.json({ response:'Mosque Id missing or incorrectly spelled in request body' })
        return
    } else {
        await Mosque.update({
            still_exists: false
        }, {
            where: {
                id: id
            }
        })
        .then(() => res.json({ response:'Mosque deleted successfully!' }))
        .catch(() => res.json({ response: 'There was a problem updating the mosque detials!'}))
    }

}

module.exports = {
    DeleteMosque: DeleteMosque
}