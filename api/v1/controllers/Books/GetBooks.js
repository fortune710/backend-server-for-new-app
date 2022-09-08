const { MosqueBooks } = require('../../../models/MosqueBooks');
const { MosqueBookDay } = require('../../../models/MosqueBookDay');
const { Op } = require('sequelize');
const moment = require('moment');

const GetUpcomingBooks = async(req, res) => {
    const { mosques_follow } = req.body;
    const date = moment(new Date().toISOString()).format("HH:mm")

    await MosqueBookDay.findAll({
        where: {
            mosque_id: {
                [Op.in]: mosques_follow
            }, 
            start_time: {
                [Op.gte]: date
            }
        }
    })
    .then((data) => {

        let book = [];
        Promise.all(data.map(async(bookDay) => {
            await MosqueBooks.findOne({
                where: {
                    mosque_id: bookDay.mosque_id,
                    book_id: bookDay.book_id
                }
            })
            .then((data) => {
                const bookData = { ...data.dataValues, days: bookDay }
                book = [...book, bookData]
            })
            .catch((err) => {
                return res.status(400).json({ message: "Error" })
            })
        }))
        .then(() => {
            return res.json({ message: "Books retrieved sucessfully!", books: book })
        })
        .catch((err) => {
            return res.status(400).json({ message: "Error gettting books" })
        })        
    })
}

module.exports = {
    GetUpcomingBooks: GetUpcomingBooks
}