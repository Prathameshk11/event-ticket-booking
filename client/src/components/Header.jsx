import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../utils/api';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setUser(null);
          setIsLoading(false);
          return;
        }
        const response = await api.get('/auth/me');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <svg className="w-8 h-8 mr-2"  fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          EventHub
        </Link>
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/events" className="hover:text-blue-200 transition duration-300">Events</Link>
          {isLoading ? (
            <span>Loading...</span>
          ) : user ? (
            <>
              <Link to="/profile" className="hover:text-blue-200 transition duration-300">My Profile</Link>
              <span className="text-blue-200">Welcome, {user.name}</span>
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition duration-300">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-200 transition duration-300">Login</Link>
              <Link to="/signup" className="bg-white text-blue-600 px-4 py-2 rounded-full hover:bg-blue-100 transition duration-300">Sign Up</Link>
            </>
          )}
        </nav>
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-blue-700 py-2">
          <Link to="/events" className="block px-4 py-2 hover:bg-blue-800 transition duration-300">Events</Link>
          {isLoading ? (
            <span className="block px-4 py-2">Loading...</span>
          ) : user ? (
            <>
              <Link to="/profile" className="block px-4 py-2 hover:bg-blue-800 transition duration-300">My Profile</Link>
              <span className="block px-4 py-2 text-blue-200">Welcome, {user.name}</span>
              <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-red-600 transition duration-300">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="block px-4 py-2 hover:bg-blue-800 transition duration-300">Login</Link>
              <Link to="/signup" className="block px-4 py-2 hover:bg-blue-800 transition duration-300">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}