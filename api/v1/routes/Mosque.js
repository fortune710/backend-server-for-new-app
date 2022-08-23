const router = require('express').Router()
const { body } = require('express-validator')

const { AddMosque } = require('../controllers/Mosque/AddMosque')
const { UpdateMosque } = require('../controllers/Mosque/UpdateMosque')
const { GetMosque } = require('../controllers/Mosque/GetMosque')
const { ApproveMosque } = require('../controllers/Mosque/ApproveMosque');
const { GetPendingMosques } = require('../controllers/Mosque/GetPendingMosques');
const { GetAllMosques } = require('../controllers/Mosque/GetAllMosques');
const { DeleteMosque } = require('../controllers/Mosque/DeleteMosque');
const { GetRegisteredMosques } = require('../controllers/Mosque/GetRegisteredMosques');
const { MosqueLogin } = require('../controllers/Mosque/MosqueLogin');


const cors = require('cors');
const corsOpts = {
    origin: '*',
    methods: [],
    allowedHeaders: [],
    exposedHeaders: [],
    credentials: true
}

router.all('/create', cors(corsOpts))
router.post('/create', (req, res) => AddMosque(req, res) )

router.post('/get-pending-mosques', (req, res) => GetPendingMosques(req,res))

router.get('/:id', [
    body('id').notEmpty().trim()
], (req, res)=> GetMosque(req, res))

router.post('/update', [
    body('id').notEmpty().trim()
], (req, res) => UpdateMosque(req,res))

router.post('/login', (req, res) => MosqueLogin(req,res) )
router.post('/approve-mosque', (req, res) => ApproveMosque(req,res))
router.get('/get-all', (req,res) => GetAllMosques(req,res))
router.post('/get-registered-mosques', (req,res) => GetRegisteredMosques(req,res))
router.post('/delete', (req,res) => DeleteMosque(req,res))


module.exports = {
    MosqueRouter: router
}