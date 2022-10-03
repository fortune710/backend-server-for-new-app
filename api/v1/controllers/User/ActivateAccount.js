const { User } = require('../../../models/User');

const checkIfAlreadyActivated = async (user_id) => {
    const user = await User.findByPk(user_id)
    return user.is_activated
}

const ActivateAccount = async(req, res) => {
    const { user_id } = req.params;
    const isActivated = await checkIfAlreadyActivated(user_id)

    await User.update({ is_activated: true }, {
        where: {
            id: user_id
        }
    })
    .then(response => {
        if(isActivated){
            return res.json({ message: "Account has already been activated" })
        } else {
            return res.json({ message: "Your account has been activated!" })
        }
    })
    .catch(err => {
        return res.status(400).json({ code: err, message: "There was a problem while activating your account!" })
    })
}

module.exports = {
    ActivateAccount: ActivateAccount
}