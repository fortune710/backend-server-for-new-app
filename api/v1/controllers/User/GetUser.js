const { User } = require('../../../models/User');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

const GetUser = async (req, res) => {
    const { id, email, password, login }  = req.body;

    if(email && password && login){
        await User.findOne({
            where: {
                email: email
            }
        })
        .then(async(data) => {

            if(data === null){
                res.json({ response: 'Account does not exist or your details are incorrect' })
            } else {
                const passwordsMatch = await bcrypt.compare(password, data.password)

                if(passwordsMatch){
                    return res.json({ 
                        response: data,
                        message: 'Account found!'
                    })
                } else {
                    return res.status(401).json({ message: 'Password Incorrect' })
                }

            }
        })
        .catch(() => res.json({ response: 'There was a problem finding your account' }))
    } 
    else if(!login) {
        if(id){
            await User.findByPk(id).then(data => {
                res.json({ response: data })
            })
            .catch(() => res.json({ response:'Error while getting user!'}))
        } else {
            return res.staus(400).json({ response:'Data missing!' })
        }  
    } 
}

module.exports = {
    GetUser: GetUser
}
