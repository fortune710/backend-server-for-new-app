const { MosqueAdmins } = require('../../../models/MosqueAdmin');


const RemoveAdmin = async(req, res) => {
    const { user_id, mosque_id } = req.body;

    if(!user_id || !mosque_id){
        res.json({ response: 'Data missing!' })
        return
    } else {
        await MosqueAdmins.update({
            status: false
        }, {
            where: {
                user_id: user_id,
                mosque_id: mosque_id
            }
        })
        .then(data => {
            res.json({ response: data, message: 'Admin Removed sucessfully' })
        })
        .catch(() => res.json({ response: 'Error while removing mosque' }))
    }
}

module.exports = {
    RemoveAdmin: RemoveAdmin
}