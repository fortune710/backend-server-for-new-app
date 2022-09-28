const { Op } = require('sequelize');
const { Mosque } = require('../../../models/Mosque');

const SearchForMosque = async(req, res) => {
    const { name } = req.params;
    if(!req.params){
        return res.json({ message: 'Data missing!' })
    }

    try {
        const mosques = await Mosque.findAll({
            where: {
                name: {
                    [Op.substring]: name
                }
            },
            limit: 5
        })
        return res.json({ mosques: mosques, message: "Mosques gotten sucessfully" })
    } catch(err) {
        return res.status(400).json({ code: err , message: "Error while searching for mosque" })
    }
}

module.exports = {
    SearchForMosque: SearchForMosque
}