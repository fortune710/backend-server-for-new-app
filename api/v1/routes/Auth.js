const express = require('express');
const { body } = require('express-validator');
const AuthRouter = express.Router();

const { AddUser } = require('../controllers/User/AddUser');
const { GetUser } = require('../controllers/User/GetUser');
const { UpdateUser } = require('../controllers/User/UpdateUser');

AuthRouter.post('/sign-in',[
    body('email').isEmail(),
], (req, res) => GetUser(req, res))

AuthRouter.post('/sign-up', [
    body('email').isEmail(),
], (req, res) => AddUser(req, res))

AuthRouter.put('/update-profile', [
    body('id').trim()
], (req, res) => UpdateUser(req, res))

module.exports = {
    AuthRouter: AuthRouter
}