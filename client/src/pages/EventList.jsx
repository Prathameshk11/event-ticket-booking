import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../utils/api';

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const searchParams = new URLSearchParams(location.search);
      const search = searchParams.get('search');
      const category = searchParams.get('category');

      try {
        const response = await api.get('/events', { params: { search, category } });
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [location]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Events</h1>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map(event => (
            <div key={event._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                <p className="text-gray-600 mb-2">📅 {new Date(event.date).toLocaleDateString()}</p>
                <p className="text-gray-600 mb-4">📍 {event.location}</p>
                <Link to={`/events/${event._id}`} className="bg-blue-500 text-white px-4 py-2 rounded-full inline-block hover:bg-blue-600 transition-colors duration-300">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}