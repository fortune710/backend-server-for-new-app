const { User } = require('../../../models/User');
const { Followership } = require('../../../models/Followership');
const bcrypt = require('bcrypt');

const checkIfAccountDoesNotExist = async(email) => { // Should return true if account does not exist
    await User.count({
        where: {
            email: email
        }
    })
    .then(num => {
        if(num > 0){ //If the account exists
            return false
        } else {
            return true
        }
    })

}

const checkMosquesUserIsFollowing = async (user_id) => {
    if(!user_id) return

    const mosques = await Followership.findAll({
        where: {
            user_id: user_id
        }
    })
    .then((followerships) => {
        let mosque_ids = []
        followerships.forEach(record => {
            mosque_ids = [...mosque_ids, record.mosque_id]
        })
        return mosque_ids
    })
    return mosques
}

const GetUser = async (req, res) => {
    const { id, email, password, login, sign_in_method }  = req.body;

    if(email && password && login){
        if(!checkIfAccountDoesNotExist(email)){
            return res.status(400).json({ message: 'Account with this email does not exist' })
        }


        if(sign_in_method === 'email'){
            await User.findOne({
                where: {
                    email: email
                }
            })
            .then(async(data) => {
                const userMosques = await checkMosquesUserIsFollowing(data?.id)

                if(data === null){
                    return res.json({ response: 'Account does not exist or your details are incorrect' })
                } 
                else if(data.password === null){
                    return res.status(400).json({ message: "Password does not exist for this account" })
                }
                else {
                    const passwordsMatch = await bcrypt.compare(password, data.password)
                    console.log(password, data.password)
                    if(passwordsMatch){
                        return res.json({ 
                            user_data: {...data, mosques_follow: userMosques},
                            message: 'Account found!'
                        })
                    } else {
                        return res.status(401).json({ message: 'Password Incorrect' })
                    }
    
                }
            })
            .catch(() => res.json({ response: 'There was a problem finding your account' }))
        } else if(sign_in_method === 'google') {
            const userMosques = await checkMosquesUserIsFollowing(data?.id)

            await User.findByPk(id)
            .then(data => {
                return res.json({ user_data: {...data, mosques_follow: userMosques} })
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
        const userMosques = await checkMosquesUserIsFollowing(data?.id)

        if(id){
            await User.findByPk(id, { 
                attributes: { exclude: ['email', 'password'] }
            }).then(data => {
                return res.json({ user_data: {...data, mosques_follow: userMosques} })
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
