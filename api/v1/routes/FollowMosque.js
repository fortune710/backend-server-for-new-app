const router = require('express').Router()
const { GetFollow }  = require('../controllers/Followership/GetFollow');
const { AddFollower } = require('../controllers/Followership/AddFollower');
const { body } = require('express-validator');

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

router.get('check', [
    body('user_id').not().isEmpty().trim(),
    body('mosque_id').not().isEmpty().trim(),
], (req, res) => GetFollow(req, res) )


router.put('add', [
    body('user_id').not().isEmpty().trim(),
    body('mosque_id').not().isEmpty().trim(),
], (req, res) => AddFollower(req, res))


module.exports = {
    FollowRouter: router
}