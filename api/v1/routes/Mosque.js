const router = require('express').Router()
const { body } = require('express-validator')

const { AddMosque } = require('../controllers/Mosque/AddMosque')
const { UpdateMosque } = require('../controllers/Mosque/UpdateMosque')
const { GetMosque } = require('../controllers/Mosque/GetMosque')

const cors = require('cors');
const corsOpts = {
    origin: '*',
    methods: [],
    allowedHeaders: [],
    exposedHeaders: [],
    credentials: true
}

router.all('/create', cors(corsOpts))
router.put('/create', (req, res) => AddMosque(req, res) )

router.get('/:id', [
    body('id').notEmpty().trim()
], (req, res)=> GetMosque(req, res))

router.put('/update', [
    body('id').notEmpty().trim()
], (req, res) => UpdateMosque(req,res))

module.exports = {
    MosqueRouter: router
}