const { Followership } = require('../../../models/Followership');


const AddFollower = async(req, res) => {
    if(!req.body){
        res.json({ response:'Data missing!' })
    } else {
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