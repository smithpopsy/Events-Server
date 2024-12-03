const router = require('express').Router()
const { createEvent, getUpcomingEvents, getFreeEvents } = require('../controllers/eventcontroller')
const auth = require('../middleware/auth')

router.post('/', auth, createEvent)
router.get('/upcoming', getUpcomingEvents)
router.get('/free', getFreeEvents)

module.exports = router