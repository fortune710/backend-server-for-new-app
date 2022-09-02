const router = require('express').Router();
const { AddBook } = require('../controllers/Books/AddBook');
const { UpdateTime } = require('../controllers/Books/UpdateTime');
const { SetBookFinished } = require('../controllers/Books/BookFinished');

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

router.post('/add', (req, res) => AddBook(req, res))
router.put('/update-time', (req, res) => UpdateTime(req,res))
router.put('/book-finished', (req, res) => SetBookFinished(req,res))

module.exports = {
    MosqueBookRouter: router
}