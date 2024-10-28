import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Events() {
  const [searchTerm, setSearchTerm] = useState('');
  const [events, setEvents] = useState([
    { id: 1, title: 'Concert A', date: '2023-07-15' },
    { id: 2, title: 'Theater Show B', date: '2023-07-20' },
    { id: 3, title: 'Sports Event C', date: '2023-07-25' },
  ]);

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="events">
      <h1>Events</h1>
      <input
        type="text"
        placeholder="Search events..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <div className="event-list">
        {filteredEvents.map(event => (
          <div key={event.id} className="event-item">
            <h2>{event.title}</h2>
            <p>Date: {event.date}</p>
            <Link to={`/events/${event.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}