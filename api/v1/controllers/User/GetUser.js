const { User } = require('../../../models/User');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

const GetUser = async (req, res) => {
    const { id, email, password, login, sign_in_method }  = req.body;

    if(email && password && login){
        if(sign_in_method === 'email'){
            await User.findOne({
                where: {
                    email: email
                }
            })
            .then(async(data) => {
    
                if(data === null){
                    return res.json({ response: 'Account does not exist or your details are incorrect' })
                } 
                else if(data.password === null){
                    return res.status(400).json({ message: "Password does not exist for this account" })
                }
                else {
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
        } else if(sign_in_method === 'google') {

            await User.findByPk(id)
            .then(data => {
                return res.json({ user_data: data })
            })
            .catch(err => {
                return res.json({ message: 'Could not get user data!', code: err })
            })
        } 
        else {
            return res.status(400).json({ response: "Invalid sign in method" })
        }

    } 
    else if(!login) {

        if(id){
            await User.findByPk(id, { 
                attributes: { exclude: ['email', 'password'] }
            }).then(data => {
                return res.json({ user_data: data })
            })
            .catch((err) => res.json({ response:'Error while getting user!', code:err }))
        } 
        else {
            return res.staus(400).json({ response:'Data missing!' })
        } 

    } 
}

module.exports = {
    GetUser: GetUser
}
