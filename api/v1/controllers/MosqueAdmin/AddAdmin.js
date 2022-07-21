const { MosqueAdmins } = require('../../../models/MosqueAdmin');

const AddAdmin = async(req, res) => {
    const { user_id } = req.body;
    if(!user_id){
        res.json({ response: 'Data missing!' })
        return

    } else {
        await MosqueAdmins.create({
            user_id: user_id,
            ...req.body
        })
        .then(data => {
            res.json({
                response: data,
                message: 'Admin created sucessfully'
            })
        })
        .catch(() => res.send({ response:'Error creating admin' }))

    }
}

module.exports = {
    AddAdmin: AddAdmin
}

