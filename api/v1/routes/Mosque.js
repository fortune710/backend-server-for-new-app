const router = require('express').Router()
const { body, param } = require('express-validator')

const { AddMosque } = require('../controllers/Mosque/AddMosque')
const { UpdateMosque } = require('../controllers/Mosque/UpdateMosque')
const { GetMosque } = require('../controllers/Mosque/GetMosque')
const { ApproveMosque } = require('../controllers/Mosque/ApproveMosque');
const { GetPendingMosques } = require('../controllers/Mosque/GetPendingMosques');
const { GetAllMosques } = require('../controllers/Mosque/GetAllMosques');
const { DeleteMosque } = require('../controllers/Mosque/DeleteMosque');
const { GetRegisteredMosques } = require('../controllers/Mosque/GetRegisteredMosques');
const { MosqueLogin } = require('../controllers/Mosque/MosqueLogin');
const { SearchForMosque } = require('../controllers/Mosque/SearchForMosque');

const cors = require('cors');
const {GetForums} = require('../controllers/Mosque/GetForums')

router.use(cors())
const corsOpts = {
    origin: '*',
    methods: [],
    allowedHeaders: [],
    exposedHeaders: [],
    credentials: true
}

router.all('/create', cors(corsOpts))

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Origin");
    next();
});

router.post('/create', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    AddMosque(req, res)
})

router.post('/get-pending-mosques', (req, res) => GetPendingMosques(req,res))


router.post('/update', [
    body('id').notEmpty().trim()
], (req, res) => UpdateMosque(req,res))

router.post('/login', (req, res) => MosqueLogin(req,res) )
router.post('/approve-mosque', (req, res) => ApproveMosque(req,res))
router.post('/get-all', (req,res) => GetAllMosques(req,res))
router.post('/get-registered-mosques', (req,res) => GetRegisteredMosques(req,res))
router.post('/delete', (req,res) => DeleteMosque(req,res))

router.put('/:id', (req, res) => GetMosque(req, res))
router.get('/:name', (req, res) => SearchForMosque(req, res))
router.get('/get-forums/:user_id', (req, res) => GetForums(req, res))

module.exports = {
    MosqueRouter: router
}