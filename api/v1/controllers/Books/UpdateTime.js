const { Op } = require('sequelize');
const { MosqueBooks } = require('../../../models/MosqueBooks');

const UpdateTimeForBook = async (req, res) => {
    const { book_id, mosque_id, } = req.body;

    if(!req.body){
        return res.json({ response: 'Data missing!' })
    } else {
        await MosqueBooks.update({...req.body }, {
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
    UpdateTimeForBook: UpdateTimeForBook
}