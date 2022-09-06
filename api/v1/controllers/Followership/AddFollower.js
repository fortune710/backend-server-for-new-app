const { Followership } = require('../../../models/Followership');

const checkIfFollowing = async(user_id, mosque_id) => {
    const isFollowing = await Followership.count({
        where: {
            user_id: user_id,
            mosque_id: mosque_id
        }
    })
    .then(data => {
        if(data == 0){
            return false
        } else {
            return true
        }
    })
    return isFollowing
}

const AddFollower = async(req, res) => {
    const { user_id, mosque_id } = req.body;

    if(!req.body){
        res.json({ response:'Data missing!' })
    } 
    else {
        await Followership.findOrCreate({
            where: {
                user_id: user_id,
                mosque_id: mosque_id
            }
        })
        .then(data => {
            res.json({ response: {
                following: true
            } 
            })
        })
        .catch(() => {
            res.json({ response: {
                message: 'Could not follow mosque',
                following: false
            }})
        })
    }
}

module.exports = {
    AddFollower: AddFollower
}