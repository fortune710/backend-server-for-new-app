const { Followership } = require('../../../models/Followership');

const DeleteFollower = async(req, res) => {
    const { user_id, mosque_id } = req.params;
    
    await Followership.destroy({
        where: {
            user_id: user_id,
            mosque_id: mosque_id
        }
    })
    .then(data => {
        return res.json({ following: false, message: 'Mosque unfollowed sucessfully' })
    })
    .catch((err) => {
        return res.status(400).json({ error: err, message: "Could not unfollow mosque" })
    })

}

module.exports = {
    DeleteFollower: DeleteFollower
}