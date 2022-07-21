const { User } = require('../../../models/User');
const { makeid } = require('../../../../helpers/randomid');

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
    const { email, password, fname, lname, type } = req.body;
    const accountExists = await checkForExistingAccount(req.body).then(number => { return number })
    
    console.log(req.body)
    if(!fname || !lname || !email || !password){
        res.json({ response:'Data missing!' })
        return
    } else if(!accountExists){
        await User.create({
            id: makeid(15),
            fname: fname,
            lname: lname,
            email: email,
            password: password,
            type: type,
        })
        .then(data => {
            res.json({ response:'Account successfully created' })
        })
        .catch(() => res.json({ response:'There was a problem creating the account.' } ))
    } else {
        res.json({ response:'Account already exists!' })
        return
    }
}


module.exports = {
    AddUser: AddUser
}