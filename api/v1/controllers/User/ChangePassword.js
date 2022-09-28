const { User } = require('../../../models/User');
const bcrypt = require('bcrypt');

const ChangePassword = async(req, res) => {
    const { current_password, new_password, user_id } = req.body;

    try{
        const user = await User.findByPk(user_id)
        const passwordsMatch = await bcrypt.compare(current_password, user.password)

        if(passwordsMatch){
            const hashedPassword = await bcrypt.hash(new_password, 10)
            return await User.update({ password: hashedPassword }, {
                where: {
                    id: user_id
                }
            })
            .then(() => {
                res.json({ message: "Updated password sucessfully" })
            })
            .catch((err) => {
                res.status(400).json({ message: "Could not update password", code: err })
            })
        } else {
            return res.status(400).json({ message: "Old password not correct" })
        }
    } catch(err){
        return res.status(400).json({ message: "There was an error...", code: err })
    }


}

module.exports = {
    ChangePassword: ChangePassword
}