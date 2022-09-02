const router = require('express').Router()
const { body } = require('express-validator')


const { AddAdmin } = require('../controllers/MosqueAdmin/AddAdmin');
const { RemoveAdmin } = require('../controllers/MosqueAdmin/RemoveAdmin');


router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

router.put('/create', [ 
    body('user_id').notEmpty().trim(),
], (req, res) => AddAdmin(req, res))

router.put('/remove', [
    body('user_id').notEmpty().trim(),
    body('mosque_id').notEmpty().trim(),
], (req, res) => RemoveAdmin(req,res))

module.exports = {
    AdminRouter: router
}