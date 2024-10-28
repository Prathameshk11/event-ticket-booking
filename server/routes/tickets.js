const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const Event = require('../models/Event');
const auth = require('../middleware/auth');

// Book a ticket
router.post('/', auth, async (req, res) => {
  try {
    const { eventId, quantity } = req.body;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }
    if (event.availableTickets < quantity) {
      return res.status(400).json({ msg: 'Not enough tickets available' });
    }

    const totalPrice = event.price * quantity;

    const ticket = new Ticket({
      user: req.user.id,
      event: eventId,
      quantity,
      totalPrice
    });

    await ticket.save();

    event.availableTickets -= quantity;
    await event.save();

    res.json(ticket);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get user's tickets
router.get('/mytickets', auth, async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user.id }).populate('event', 'title date location');
    res.json(tickets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Cancel a ticket
router.delete('/:id', auth, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ msg: 'Ticket not found' });
    }
    if (ticket.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    const event = await Event.findById(ticket.event);
    if (event) {
      event.availableTickets += ticket.quantity;
      await event.save();
    }

    await ticket.remove();
    res.json({ msg: 'Ticket cancelled' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;