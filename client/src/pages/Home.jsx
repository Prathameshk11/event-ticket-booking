import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const featuredEvents = [
    { id: 1, title: "Summer Music Festival", date: "2023-07-15", location: "Central Park, New York", image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=300&q=80" },
    { id: 2, title: "Tech Conference 2023", date: "2023-08-10", location: "Convention Center, San Francisco", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=300&q=80" },
    { id: 3, title: "Food & Wine Expo", date: "2023-09-05", location: "Expo Center, Chicago", image: "https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&w=300&q=80" },
  ];

  const categories = [
    { id: 1, name: "Music", icon: "🎵" },
    { id: 2, name: "Technology", icon: "💻" },
    { id: 3, name: "Food & Drink", icon: "🍷" },
    { id: 4, name: "Sports", icon: "⚽" },
    { id: 5, name: "Arts & Theater", icon: "🎭" },
    { id: 6, name: "Business", icon: "💼" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="bg-gray-100">
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Amazing Events</h1>
          <p className="text-xl mb-8">Find and book tickets for the hottest events in your area</p>
          <form onSubmit={handleSearch} className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="text"
                placeholder="Search events..."
                className="w-full px-4 py-2 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-900"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-r-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map(event => (
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
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(category => (
              <div key={category.id} className="bg-gray-100 rounded-lg p-4 text-center transition-transform duration-300 hover:scale-105">
                <div className="text-4xl mb-2">{category.icon}</div>
                <h3 className="text-lg font-semibold">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Amazing Events?</h2>
          <p className="text-xl mb-8">Join EventHub today and never miss out on your favorite events!</p>
          <Link to="/signup" className="bg-white text-blue-500 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-100 transition-colors duration-300">
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
}