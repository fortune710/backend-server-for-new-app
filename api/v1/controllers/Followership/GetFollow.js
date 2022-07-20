const { Followership } = require('models/Followership');
const { Op } = require('sequelize');


const GetFollow = async(req, res) => {
    const { user_id, mosque_id } = req.body;

    if(!req.body){
        res.json({ response: 'Data misssing!' })
        return
    } else {
        await Followership.count({
            where: {
                [Op.and]: [
                    { user_id: user_id },
                    { mosque_id: mosque_id }
                ]
            }
        })
        .then(data => {
            if(number < 1)
                res.json({ response: {
                    following: false
                } })
            else 
            res.json({ response: {
                following: true
            } })

        })
        .catch(()=>{
            res.json({ response: 'Error while reading table' })
        })
    }
}

module.exports = {
    GetFollow: GetFollow
}