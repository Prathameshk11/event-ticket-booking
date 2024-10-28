import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function EventList() {
  const [events] = useState([
    { id: 1, title: "Summer Music Festival", date: "2023-07-15", location: "Central Park, New York", image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=300&q=80" },
    { id: 2, title: "Tech Conference 2023", date: "2023-08-10", location: "Convention Center, San Francisco", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=300&q=80" },
    { id: 3, title: "Food & Wine Expo", date: "2023-09-05", location: "Expo Center, Chicago", image: "https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&w=300&q=80" },
    { id: 4, title: "Art Gallery Opening", date: "2023-07-22", location: "Metropolitan Museum, New York", image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=300&q=80" },
    { id: 5, title: "Marathon 2023", date: "2023-10-01", location: "City Center, Boston", image: "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?auto=format&fit=crop&w=300&q=80" },
    { id: 6, title: "Comedy Night", date: "2023-08-18", location: "Laugh Factory, Los Angeles", image: "https://images.unsplash.com/photo-1585647347483-22b66260dfff?auto=format&fit=crop&w=300&q=80" },
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map(event => (
          <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
            <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="text-gray-600 mb-2">📅 {event.date}</p>
              <p className="text-gray-600 mb-4">📍 {event.location}</p>
              <Link to={`/events/${event.id}`} className="bg-blue-500 text-white px-4 py-2 rounded-full inline-block hover:bg-blue-600 transition-colors duration-300">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    
    </div>
  );
}