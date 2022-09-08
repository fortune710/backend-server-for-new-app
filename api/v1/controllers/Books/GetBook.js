const { MosqueBooks } = require('../../../models/MosqueBooks');
const { MosqueBookDay } = require('../../../models/MosqueBookDay');

const GetBook = async(req, res) => {
    const { id } = req.params;

    if(!req.body){
        return res.status(400).json({ message: "Data missing!" })
    } else {
        await MosqueBooks.findOne({
            where: {
                book_id: id
            }
        })
        .then(async(res) => {
            await MosqueBookDay.findAll({
                where: {
                    book_id: res.book_id,
                    mosque_id: res.mosque_id
                },
                order: [
                    ['day', 'ASC']
                ]
            })
            .then(days => {
                return res.json({ book_data: {...res.dataValues, days: days.dataValues } })
            })
        })
    }

}

module.exports = {
    GetBook: GetBook
}