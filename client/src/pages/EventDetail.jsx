import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/EventDetail.css';

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    // Fetch event details here
    // For now, we'll use mock data
    setEvent({
      id,
      title: 'Event Title',
      description: 'This is a detailed description of the event.',
      date: '2023-07-15',
      time: '19:00',
      location: 'Event Venue, City',
    });
  }, [id]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="event-detail">
      <h1>{event.title}</h1>
      <p className="description">{event.description}</p>
      <div className="event-info">
        <p><strong>Date:</strong> {event.date}</p>
        <p><strong>Time:</strong> {event.time}</p>
        <p><strong>Location:</strong> {event.location}</p>
      </div>
      <button className="book-ticket">Book Ticket</button>
    </div>
  );
}