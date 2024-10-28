import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">EventHub</Link>
        <div className="hidden md:flex space-x-4">
          <Link to="/events" className="hover:text-blue-200">Events</Link>
          <Link to="/profile" className="hover:text-blue-200">My Profile</Link>
          <Link to="/login" className="hover:text-blue-200">Login</Link>
          <Link to="/signup" className="bg-white text-blue-500 px-4 py-2 rounded-full hover:bg-blue-100">Sign Up</Link>
        </div>
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-blue-600 py-2">
          <Link to="/events" className="block px-4 py-2 hover:bg-blue-700">Events</Link>
          <Link to="/profile" className="block px-4 py-2 hover:bg-blue-700">My Profile</Link>
          <Link to="/login" className="block px-4 py-2 hover:bg-blue-700">Login</Link>
          <Link to="/signup" className="block px-4 py-2 hover:bg-blue-700">Sign Up</Link>
        </div>
      )}
    </header>
  );
}