const router = require('express').Router()
const { GetFollow }  = require('../controllers/Followership/GetFollow');
const { AddFollower } = require('../controllers/Followership/AddFollower');
const { DeleteFollower } = require('../controllers/Followership/DeleteFollower')
const { body, param } = require('express-validator');

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

//Gets all the mosques that a user is following
router.get('/mosques/:id', (req, res) => GetFollow(req, res) )


router.put('/add', [
    body('user_id').not().isEmpty().trim(),
    body('mosque_id').not().isEmpty().trim(),
], (req, res) => AddFollower(req, res))

router.delete('/remove',[
    body('user_id').not().isEmpty().trim(),
    body('mosque_id').not().isEmpty().trim(),
], (req,res) => DeleteFollower(req, res))

module.exports = {
    FollowRouter: router
}