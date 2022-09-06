const { Followership } = require('../../../models/Followership');

const checkIfFollowing = async(user_id, mosque_id) => {
    const isFollowing = await Followership.findOne({
        where: {
            user_id: user_id,
            mosque_id: mosque_id
        }
    })
    .then(data => {
        if(data){
            return true
        } else {
            return false
        }
    })
    return isFollowing
}

const AddFollower = async(req, res) => {
    const { user_id, mosque_id } = req.body;

    if(!req.body){
        res.json({ response:'Data missing!' })
    } 
    else if(checkIfFollowing(user_id, mosque_id)){
        return res.json({ following: checkIfFollowing(user_id, mosque_id),  message: "Already following!" })
    } 
    else {
        await Followership.create({
            ...req.body
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