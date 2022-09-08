const { Op } = require('sequelize');
const { MosqueBooks } = require('../../../models/MosqueBooks');
const { Book } = require('../../../models/Books');
const { makeid } = require('../../../../helpers/randomid');
const { MosqueBookDay } = require('../../../models/MosqueBookDay');

const addDifferentDays = (req, res) => {
    
}


const checkIfBookExists = async(requestBody) => {
    const { id } = requestBody.book;
    if(!id) {
        return false
    } else {
        const exists = await Book.findByPk(id)
        .then(res => {
            if(res)
                return true;
            else 
                return false
        })
        return exists
    }
}


const AddBook = async(req, res) => {
    const { mosque_id, book } = req.body;
    const { name, days, teacher, } = book;

    if(!req.body){
        res.json({ response: "Data missing!" })
        return;
    } 
    else {
        await MosqueBooks.create({
            id: makeid(10),
            book_id: makeid(10),
            book_name: name,
            mosque_id: mosque_id,
            teacher: teacher
        })
        .then((res) => {
            Promise.all(
                days.map(async(day) => {
                    await MosqueBookDay.create({
                        id: makeid(12),
                        book_id: res.book_id,
                        mosque_id: res.mosque_id,
                        day: day.code,
                        start_time: day.startTime,
                    })
                })
            ).then(data => {
                return res.json({ message: "Book was added sucessfully", book_data: data })
            })
            .catch((err) => {
                return res.status(400).json({ message: "Could not add book days", code: err })
            })
        })
        .catch((err) => {
            return res.status(400).json({ message:"Could not add book", code: err })
        })
        
    }
}

module.exports = {
    AddBook: AddBook
}