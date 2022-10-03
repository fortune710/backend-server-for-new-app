const { User } = require('../../../models/User');
const { makeid } = require('../../../../helpers/randomid');
const { transporterForEmail } = require('../../../config/mail.config');
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

const sendEmail = (email, user_id) => {
    transporterForEmail.sendMail({
        subject: "Activate your Iqama Account",
        from: "noreply@iqama.app",
        to: email,
        html: `
        <h1>Activate your account</h1>

        <p>Click the link below to activate your account</p>

        <button href="https://iiqama-api.herokuapp.com/auth/activate/${user_id}">
            Activate Account
        </button>
        `
    })
}


const AddUser = async (req, res) => {
    const { id, email, password, name, type, auth_method, profile_pic } = req.body;
    const accountExists = await checkForExistingAccount(req.body).then(number => { return number })

    const hashedPassword = await bcrypt.hash(password, 10)
    
    if(!name || !email || !password){
        return res.json({ response:'Data missing!' })
    } 
    
    if(accountExists){
        return res.json({ response:'Account already exists!' })
    }
    
    if(auth_method === 'email'){
        return await User.create({
            id: makeid(15),
            name: name,
            email: email,
            password: hashedPassword,
            type: type,
            profile_pic: profile_pic,
            sign_in_method: auth_method
        })
        .then(data => {
            sendEmail(data.email, data.user_id)
            return res.json({ sent_email: true, message:"We've sent you an email, check your email to verify your account" })
        })
        .catch(() => {
            return res.json({ message:'There was a problem creating the account.' })
        })
    }
    else if(auth_method === 'google'){
        return await User.create({
            id: id,
            email: email,
            name: name,
            sign_in_method: auth_method,
            profile_pic: profile_pic,
            type: type
        })
        .then(data => {
            return res.json({ user_data: data, message:'Account successfully created with Google' })
        })
        .catch(() => {
            return res.json({ message:'There was a problem creating the account.' })
        })

    } else {
        return res.status(400).json({ message: 'Invalid sign up method' })
    }
}


module.exports = {
    AddUser: AddUser
}