const { User } = require('../../../models/User');


const UpdateUser = async (req, res) => {
    const { id } = req.body;
    
    if(!id){
        res.json({ response:'Data missing!' })
        return
    } else {
        await User.update({...req.body}, 
            { where: { id: id } 
        })
        .then(() => res.json({ response:'Account updated successfully!' }))
        .catch(() => res.json({ response: 'There was a problem updating the account!'}))
    }
}


module.exports = {
    UpdateUser: UpdateUser
}