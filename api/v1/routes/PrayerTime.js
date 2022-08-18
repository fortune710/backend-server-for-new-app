const router = require('express').Router()
const { body } = require('express-validator')

const { AddTime } = require('../controllers/PrayerTime/AddTime');
const { UpdateTime } = require('../controllers/PrayerTime/UpdateTime');

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

module.exports = {
    PrayerTimeRouter: router
}

