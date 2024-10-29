const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const Event = require('../models/Event');
const auth = require('../middleware/auth');


router.post('/', auth, async (req, res) => {
  try {
    const { eventId, quantity } = req.body;
    
    if (!eventId || !quantity) {
      return res.status(400).json({ msg: 'EventId and quantity are required' });
    }

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

    res.status(201).json(ticket);
  } catch (err) {
    console.error('Error in ticket creation:', err);
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
});

// Get user's tickets
router.get('/mytickets', auth, async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user.id }).populate('event', 'title date location');
    res.json(tickets);
  } catch (err) {
    console.error('Error fetching user tickets:', err);
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
});

// Cancel a ticket
router.delete('/:id', auth, async (req, res) => {
  try {
    console.log('Cancelling ticket with ID:', req.params.id);
    console.log('User ID:', req.user.id);

    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      console.log('Ticket not found');
      return res.status(404).json({ msg: 'Ticket not found' });
    }
    
    console.log('Ticket found:', ticket);

    if (ticket.user.toString() !== req.user.id) {
      console.log('User not authorized');
      return res.status(401).json({ msg: 'User not authorized' });
    }

    const event = await Event.findById(ticket.event);
    if (event) {
      event.availableTickets += ticket.quantity;
      await event.save();
      console.log('Event updated:', event);
    } else {
      console.log('Event not found for ticket:', ticket.event);
    }

    const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);
    console.log('Deleted ticket:', deletedTicket);

    if (!deletedTicket) {
      console.log('Ticket not found when trying to delete');
      return res.status(404).json({ msg: 'Ticket not found when trying to delete' });
    }

    res.json({ msg: 'Ticket cancelled successfully' });
  } catch (err) {
    console.error('Error in ticket cancellation:', err);
    res.status(500).json({ msg: 'Server Error', error: err.message, stack: err.stack });
  }
});

module.exports = router;