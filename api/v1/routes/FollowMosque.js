const router = require('express').Router()
const { GetFollow }  = require('../controllers/Followership/GetFollow');
const { AddFollower } = require('../controllers/Followership/AddFollower');
const { body } = require('express-validator');


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