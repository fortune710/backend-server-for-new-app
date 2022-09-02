const router = require('express').Router()
const { body } = require('express-validator')

const { AddPost } = require('../controllers/Post/AddPost');
const { AddReply } = require('../controllers/Post/AddReply');
const { FlagPost } = require('../controllers/Post/FlagPost');

const uploadFile = require('../../config/cloudinary')

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

router.put('/create', [
    body('user_id').trim(),
    body('mosque_id').trim(),
    body('content').trim(),
], uploadFile.single('file'), (req, res) => AddPost(req, res))

router.put('/flag', [
    body('post_id').notEmpty().trim(),
], (req, res) => FlagPost(req, res))

router.put('/create-reply', [
    body('user_id').notEmpty().trim(),
    body('parent_id').notEmpty().trim(),
    body('content').notEmpty().trim(),
], (req, res) => AddReply(req, res))

module.exports = {
    PostRouter: router
}