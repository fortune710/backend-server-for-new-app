const { Mosque } = require('../../../models/Mosque');


const DeleteMosque = async(req, res) => {
    const { mosque_id } = req.body

    if(!mosque_id){
        return res.status(400).json({ response:'Mosque Id missing or incorrectly spelled in request body' })
    } else {
        await Mosque.update({ still_exists: false }, 
            {
                where: {
                    id: mosque_id
                }
            })
        .then(() => res.json({ response:'Mosque deleted successfully!' }))
        .catch(() => res.json({ response: 'There was a problem updating the mosque detials!'}))
    }

}

module.exports = {
    DeleteMosque: DeleteMosque
}