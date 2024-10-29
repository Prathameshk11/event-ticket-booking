import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../utils/api';

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/events/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error("Failed to fetch event details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading...</div>;
  }

  if (!event) {
    return <div className="container mx-auto px-4 py-8 text-center">Event not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
          <p className="text-gray-600 mb-2">📅 Date: {new Date(event.date).toLocaleDateString()}</p>
          <p className="text-gray-600 mb-2">🕒 Time: {new Date(event.date).toLocaleTimeString()}</p>
          <p className="text-gray-600 mb-4">📍 Location: {event.location}</p>
          <p className="text-gray-800 mb-6">{event.description}</p>
          <div className="flex justify-between items-center mb-6">
            <p className="text-2xl font-bold">${event.price.toFixed(2)}</p>
            <p className="text-gray-600">Available Tickets: {event.availableTickets}</p>
          </div>
          <Link 
            to={`/booking/${event._id}`} 
            className="bg-blue-500 text-white px-6 py-3 rounded-full inline-block hover:bg-blue-600 transition-colors duration-300 text-lg font-semibold"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}