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
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

router.post('/create', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
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

router.put('/:id', [
    body('id').notEmpty().trim()
], (req, res)=> GetMosque(req, res))


module.exports = {
    MosqueRouter: router
}