const router = require('express').Router()
const { body } = require('express-validator')

const { AddPost } = require('../controllers/Post/AddPost');
const { AddReply } = require('../controllers/Post/AddReply');
const { FlagPost } = require('../controllers/Post/FlagPost');


router.put('/create', [
    body('user_id').notEmpty().trim(),
    body('mosque_id').notEmpty().trim(),
    body('content').notEmpty().trim(),
], (req, res) => AddPost(req, res))

router.put('/flag', [
    body('post_id').notEmpty().trim(),
], (req, res) => FlagPost(req, res))

router.put('/create-reply', [
    body('user_id').notEmpty().trim(),
    body('mosque_id').notEmpty().trim(),
    body('content').notEmpty().trim(),
], (req, res) => AddReply(req, res))

module.exports = {
    PostRouter: router
}