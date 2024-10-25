import { Link } from 'react-router-dom';
import '../styles/Home.css';

export default function Home() {
  return (
    <div className="home">
      <header>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <h1>Welcome to Event Ticket Booking</h1>
        <section className="featured-events">
          <h2>Featured Events</h2>
          {/* Add featured events here */}
        </section>
      </main>
      <footer>
        <p>&copy; 2023 Event Ticket Booking. All rights reserved.</p>
      </footer>
    </div>
  );
}