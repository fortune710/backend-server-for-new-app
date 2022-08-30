const router = require('express').Router()
const { body } = require('express-validator')

const { AddTime } = require('../controllers/PrayerTime/AddTime');
const { UpdateTime } = require('../controllers/PrayerTime/UpdateTime');
const { GetNextPrayer } = require('../controllers/PrayerTime/GetNextPrayer');

const cors = require('cors');
const corsOpts = {
    origin: '*',
    methods: [],
    allowedHeaders: [],
    exposedHeaders: [],
    credentials: true
}

router.all('/add', cors(corsOpts))

router.put('/add', [
    body('prayer_id').not().isEmpty(),
    body('mosque_id').not().isEmpty()
], (req, res) => AddTime(req, res))


router.put('/update', [
    body('call_time').trim(),
    body('start_time').trim(),
    body('prayer_id').not().isEmpty(),
    body('mosque_id').not().isEmpty()
], (req, res) => UpdateTime(req, res))

router.get('/:id', (req,res) => GetNextPrayer(req,res))

module.exports = {
    PrayerTimeRouter: router
}

