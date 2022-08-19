const { Op } = require('sequelize');
const { MosqueBooks } = require('../../../models/MosqueBooks');
const { Book } = require('../../../models/Books');
const { makeid } = require('../../../../helpers/randomid');

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
    const { book, mosque_id, start_time, stop_time } = req.body;

    if(!req.body){
        res.json({ response: "Data missing!" })
        return;
    } 
    else if(checkIfBookExists(req.body)){
        const mosqueBook = await MosqueBooks.create({
            id: makeid(10),
            book_id: book.id,
            mosque_id: mosque_id,
            start_time: start_time,
            stop_time: stop_time
        })
        return res.json({ data: mosqueBook })
    }
    else {
        await Book.create({
            id: makeid(10),
            name: book.name
        })
        .then(async (res) => {
            const mosqueBook = await MosqueBooks.create({
                id: makeid(10),
                book_id: res.id,
                mosque_id: mosque_id,
                start_time: start_time,
                stop_time: stop_time
            })
            return res.json({ data: {res, mosqueBook} })
        })
    }
}

module.exports = {
    AddBook: AddBook
}