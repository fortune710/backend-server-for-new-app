const { User } = require('../../../models/User');
const { Op } = require('sequelize')

const GetUser = async (req, res) => {
    const { id, email, password }  = req.body;

    if(email && password){
        await User.findOne({
            where: {
                [Op.and]: [
                    { email: email },
                    { password: password }
                ]
            }
        })
        .then(data => {

            if(data === null){
                res.json({ response: 'Account does not exist or your details are incorrect' })
            } else {
                res.json({ 
                    response: data,
                    message: 'Account found!'
                })
            }
        })
        .catch(() => res.json({ response: 'There was a problem finding your account' }))
    } 
    else if(!id) {
        res.json({ response:'Data missing!' })
        return
    } else {
        await User.findByPk(id).then(data => {
            res.json({ response: data })
        })
        .catch(() => res.json({ response:'Error while getting user!'}))
    }
}

module.exports = {
    GetUser: GetUser
}
