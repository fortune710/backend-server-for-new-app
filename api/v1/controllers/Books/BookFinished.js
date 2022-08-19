const { Op } = require('sequelize');
const { MosqueBooks } = require('../../../models/MosqueBooks');

const setBookFinished = async (req, res) => {
    const { book_id, mosque_id, status } = req.body;

    if(!req.body){
        return res.json({ response: 'Data missing!' })
    } else {
        await MosqueBooks.update({ status: status }, {
            where: {
                [Op.and]: [
                    { book_id: book_id },
                    { mosque_id: mosque_id }
                ]
            }
        })
        .then((res) => {
            return res.json({ data: res })
        })
        .catch(() => {
            return res.json({ response: 'Could not Update time!' })
        })
    }
}

module.exports = {
    SetBookFinished: setBookFinished 
}