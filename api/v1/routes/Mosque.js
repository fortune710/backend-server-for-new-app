const router = require('express').Router()
const { body } = require('express-validator')

const { AddMosque } = require('../controllers/Mosque/AddMosque')
const { UpdateMosque } = require('../controllers/Mosque/UpdateMosque')
const { GetMosque } = require('../controllers/Mosque/GetMosque')

router.put('/create', [
    body('id').notEmpty().trim()
], (req, res) => AddMosque(req, res) )

router.get('/:id', [
    body('id').notEmpty().trim()
], (req, res)=> GetMosque(req, res))

router.put('/update', [
    body('id').notEmpty().trim()
], (req, res) => UpdateMosque(req,res))

module.exports = {
    MosqueRouter: router
}