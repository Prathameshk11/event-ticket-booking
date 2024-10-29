import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../utils/api';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchFeaturedEvents = async () => {
      try {
        const response = await api.get('/events?limit=3');
        setFeaturedEvents(response.data);
      } catch (error) {
        console.error('Error fetching featured events:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await api.get('/events/categories');
        setCategories(response.data.map((category, index) => ({
          id: index + 1,
          name: category,
          icon: getCategoryIcon(category)
        })));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchFeaturedEvents();
    fetchCategories();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    window.location.href = `/events?search=${searchTerm}`;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Music': '🎵',
      'Technology': '💻',
      'Food & Drink': '🍷',
      'Sports': '⚽',
      'Arts & Theater': '🎭',
      'Business': '💼'
    };
    return icons[category] || '🎉';
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
              <button type="submit" className="bg-blue-500 text-white px-6  py-2 rounded-r-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
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
              <div key={event._id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-2">📅 {new Date(event.date).toLocaleDateString()}</p>
                  <p className="text-gray-600 mb-4">📍 {event.location}</p>
                  <Link to={`/events/${event._id}`} className="bg-blue-500 text-white px-4 py-2 rounded-full inline-block hover:bg-blue-600 transition-colors duration-300">
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
              <Link key={category.id} to={`/events?category=${category.name}`} className="bg-gray-100 rounded-lg p-4 text-center transition-transform duration-300 hover:scale-105">
                <div className="text-4xl mb-2">{category.icon}</div>
                <h3 className="text-lg font-semibold">{category.name}</h3>
              </Link>
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