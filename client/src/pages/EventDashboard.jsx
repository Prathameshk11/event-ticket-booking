import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function EventDashboard() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events');
        const data = await response.json();
        setUpcomingEvents(data);
      } catch (err) {
        console.error('Failed to fetch events', err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Event Dashboard</h1>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-2xl font-semibold text-gray-900">Upcoming Events</h2>
          </div>
          <div className="border-t border-gray-200">
            <ul className="divide-y divide-gray-200">
              {upcomingEvents.map((event) => (
                <li key={event._id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-blue-600 truncate">{event.title}</p>
                      <p className="mt-1 text-sm text-gray-500">📅 Date: {new Date(event.date).toLocaleDateString()}</p>
                      <p className="mt-1 text-sm text-gray-500">📍 Location: {event.location}</p>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <Link
                        to={`/events/${event._id}`}
                        className="px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
