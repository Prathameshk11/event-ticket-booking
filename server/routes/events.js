const express = require('express');
const router = express.Router();
const { getEvents, getEvent, createEvent } = require('../controllers/eventController');
const auth = require('../middleware/auth');

router.get('/', getEvents);
router.get('/:id', getEvent);
router.post('/', auth, createEvent);

module.exports = router;