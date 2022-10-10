const { Op } = require('sequelize');
const { Mosque } = require('../../../models/Mosque');
const { Followership } = require('../../../models/Followership');
const { response } = require('express');

const GetForumInfo = async(mosque_id) => {
    const mosque = await Mosque.findByPk(mosque_id)

    const memberCount = await Followership.count({
        where: {
            mosque_id: mosque_id
        }
    })

    return {
        mosque_info: mosque,
        member_count: memberCount
    }
}


const GetForums = async (req, res) => {
    const { user_id } = req.params;

    if(!user_id){
        return res.json({ forums: [] })
    }
    await Followership.findAll({
        where: {
            user_id: user_id
        },
        attributes: {
            include: ['mosque_id']
        }
    })
    .then(data => {
        Promise.all(data.map(async(followership) => {
            return(GetForumInfo(followership.mosque_id))
        }))
        .then(response => {
            res.json(response)
        })
    })
}

module.exports = {
    GetForums: GetForums
}
