const express = require('express');
const { body } = require('express-validator');
const AuthRouter = express.Router();

const { AddUser } = require('../controllers/User/AddUser');
const { GetUser } = require('../controllers/User/GetUser');
const { UpdateUser } = require('../controllers/User/UpdateUser');
const {ChangePassword} = require('../controllers/User/ChangePassword');

AuthRouter.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

AuthRouter.post('/sign-in',[
    body('email').isEmail(),
], (req, res) => GetUser(req, res))

AuthRouter.post('/sign-up', [
    body('email').isEmail(),
], (req, res) => AddUser(req, res))

AuthRouter.put('/update-profile', [
    body('id').trim()
], (req, res) => UpdateUser(req, res))

AuthRouter.put('/change-password', [
    body('user_id').trim()
], (req, res) => ChangePassword(req, res))

module.exports = {
    AuthRouter: AuthRouter
}