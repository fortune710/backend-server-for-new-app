const { User } = require('../../../models/User');
const { makeid } = require('../../../../helpers/randomid');
const bcrypt = require('bcrypt');

const checkForExistingAccount = async (body) => {
    const { email } = body;
    const existingUsers = await User.count({
        where: {
            email: email
        }
    }).then(number => {
        return number
    })

    if (existingUsers === 0)
        return false
    else 
        return true
}


const AddUser = async (req, res) => {
    const { id, email, password, name, type, auth_method, profile_pic } = req.body;
    const accountExists = await checkForExistingAccount(req.body).then(number => { return number })

    const hashedPassword = await bcrypt.hash(password, 10)
    
    console.log(req.body)
    if(!name || !email || !password){
        return res.json({ response:'Data missing!' })
        
    } else if(!accountExists){

        if(auth_method === 'email'){
            await User.create({
                id: makeid(15),
                name: name,
                email: email,
                password: hashedPassword,
                type: type,
                profile_pic: profile_pic,
                sign_in_method: auth_method
            })
            .then(data => {
                res.json({ user_data: data, message:'Account successfully created with email' })
            })
            .catch(() => res.json({ message:'There was a problem creating the account.' } ))
        }
        else if(auth_method === 'google'){
            await User.create({
                id: id,
                email: email,
                name: name,
                sign_in_method: auth_method,
                profile_pic: profile_pic,
                type: type
            })
            .then(data => {
                res.json({ user_data: data, message:'Account successfully created with Google' })
            })
            .catch(() => res.json({ message:'There was a problem creating the account.' } ))

        } else {
            return res.status(400).json({ message: 'Invalid sign up method' })
        }

    } else {
        return res.json({ response:'Account already exists!' })
    }
}


module.exports = {
    AddUser: AddUser
}