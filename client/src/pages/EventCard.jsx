import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/EventCard.css';

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <h3>{event.title}</h3>
      <p>Date: {new Date(event.date).toLocaleDateString()}</p>
      <p>Time: {event.time}</p>
      <p>Location: {event.location}</p>
      <Link to={`/events/${event._id}`} className="view-details">
        View Details
      </Link>
    </div>
  );
};

export default EventCard;