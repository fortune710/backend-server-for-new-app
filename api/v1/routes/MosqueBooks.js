const router = require('express').Router();
const { AddBook } = require('../controllers/Books/AddBook');
const { UpdateTime } = require('../controllers/Books/UpdateTime');
const { SetBookFinished } = require('../controllers/Books/BookFinished');

router.post('/add', (req, res) => AddBook(req, res))
router.put('/update-time', (req, res) => UpdateTime(req,res))
router.put('/book-finished', (req, res) => SetBookFinished(req,res))

module.exports = {
    MosqueBookRouter: router
}