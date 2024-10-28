import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    // Simulating an API call to fetch event details
    const fetchEvent = async () => {
      // In a real application, you would fetch data from your API here
      const mockEvent = {
        id: id,
        title: "Summer Music Festival",
        date: "2023-07-15",
        time: "12:00 PM - 10:00 PM",
        location: "Central Park, New York",
        description: "Join us for a day of amazing music featuring top artists from around the world. Food and drinks will be available.",
        image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1000&q=80",
        price: 59.99,
        availableTickets: 500
      };
      setEvent(mockEvent);
    };

    fetchEvent();
  }, [id]);

  if (!event) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
          <p className="text-gray-600 mb-2">📅 Date: {event.date}</p>
          <p className="text-gray-600 mb-2">🕒 Time: {event.time}</p>
          <p className="text-gray-600 mb-4">📍 Location: {event.location}</p>
          <p className="text-gray-800 mb-6">{event.description}</p>
          <div className="flex justify-between items-center mb-6">
            <p className="text-2xl font-bold">${event.price.toFixed(2)}</p>
            <p className="text-gray-600">Available Tickets: {event.availableTickets}</p>
          </div>
          <Link 
            to={`/booking/${event.id}`} 
            className="bg-blue-500 text-white px-6 py-3 rounded-full inline-block hover:bg-blue-600 transition-colors duration-300 text-lg font-semibold"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}