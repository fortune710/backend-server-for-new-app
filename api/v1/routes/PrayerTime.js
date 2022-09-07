const router = require('express').Router()
const { body } = require('express-validator')

const { AddTime } = require('../controllers/PrayerTime/AddTime');
const { UpdateTime } = require('../controllers/PrayerTime/UpdateTime');
const { getPrayerTimes } = require('../controllers/PrayerTime/GetTimes');


const cors = require('cors');
const corsOpts = {
    origin: '*',
    methods: [],
    allowedHeaders: [],
    exposedHeaders: [],
    credentials: true
}

router.all('/add', cors(corsOpts))

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

router.put('/add', [
    body('prayer_id').not().isEmpty(),
    body('mosque_id').not().isEmpty()
], (req, res) => AddTime(req, res))


router.put('/update', [
    body('prayer_id').not().isEmpty(),
    body('mosque_id').not().isEmpty()
], (req, res) => UpdateTime(req, res))

router.post('/get', (req,res) => getPrayerTimes(req,res))

module.exports = {
    PrayerTimeRouter: router
}

