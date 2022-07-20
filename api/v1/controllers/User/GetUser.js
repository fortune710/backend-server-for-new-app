const { User } = require('models/User');


const GetUser = async (req, res) => {
    const { id }  = req.body;

    if(!id) {
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
