const { User } = require('models/User');


const UpdateMosque = async(req, res) => {
    const { id } = req.body

    if(!id){
        res.json({ response:'Data Missing!' })
        return
    } else {
        await User.update({...req.body}, {
            where: {
                id: id
            }
        })
        .then(() => res.json({ response:'Mosque updated successfully!' }))
        .catch(() => res.json({ response: 'There was a problem updating the mosque detials!'}))
    }

}

module.exports = {
    UpdateMosque: UpdateMosque
}