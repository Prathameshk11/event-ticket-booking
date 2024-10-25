const Ticket = require('../models/Ticket');
const Event = require('../models/Event');

exports.bookTicket = async (req, res) => {
  try {
    const { eventId } = req.body;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    if (event.availableTickets === 0) {
      return res.status(400).json({ message: 'No tickets available' });
    }
    const ticket = new Ticket({
      event: eventId,
      user: req.user.id
    });
    await ticket.save();
    event.availableTickets -= 1;
    await event.save();
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user.id }).populate('event');
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.cancelTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    if (ticket.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    if (ticket.status === 'cancelled') {
      return res.status(400).json({ message: 'Ticket already cancelled' });
    }
    ticket.status = 'cancelled';
    await ticket.save();
    const event = await Event.findById(ticket.event);
    event.availableTickets += 1;
    await event.save();
    res.json({ message: 'Ticket cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};