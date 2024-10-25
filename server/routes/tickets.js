const express = require('express');
const router = express.Router();
const { bookTicket, getUserTickets, cancelTicket } = require('../controllers/ticketController');
const auth = require('../middleware/auth');

router.post('/book', auth, bookTicket);
router.get('/user', auth, getUserTickets);
router.put('/cancel/:id', auth, cancelTicket);

module.exports = router;