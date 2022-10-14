const express = require('express');
const { body, param } = require('express-validator');
const AuthRouter = express.Router();

const { AddUser } = require('../controllers/User/AddUser');
const { GetUser } = require('../controllers/User/GetUser');
const { UpdateUser } = require('../controllers/User/UpdateUser');
const {ChangePassword} = require('../controllers/User/ChangePassword');
const { ActivateAccount } = require('../controllers/User/ActivateAccount');
const { SendEmail } = require('../controllers/User/SendEmail');
/*
AuthRouter.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Origin");
    next();
});
*/
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

AuthRouter.get('/activate/:user_id',[
    param('user_id').trim()
] ,(req, res) => ActivateAccount(req, res))

AuthRouter.post('/email', [
    body('email').isEmail()
], (req, res) => SendEmail(req, res))

module.exports = {
    AuthRouter: AuthRouter
}