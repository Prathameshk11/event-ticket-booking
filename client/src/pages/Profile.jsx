import { useState, useEffect } from 'react';
import '../styles/Profile.css';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    // Fetch user data and tickets here
    // For now, we'll use mock data
    setUser({ name: 'John Doe', email: 'john@example.com' });
    setTickets([
      { id: 1, eventTitle: 'Concert A', date: '2023-07-15' },
      { id: 2, eventTitle: 'Theater Show B', date: '2023-07-20' },
    ]);
  }, []);

  const handleCancelTicket = (ticketId) => {
    // Handle ticket cancellation logic here
    console.log('Cancelling ticket:', ticketId);
  };

  if  (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      <h1>Profile</h1>
      <div className="user-info">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <h2>My Tickets</h2>
      <div className="ticket-list">
        {tickets.map(ticket => (
          <div key={ticket.id} className="ticket-item">
            <h3>{ticket.eventTitle}</h3>
            <p>Date: {ticket.date}</p>
            <button onClick={() => handleCancelTicket(ticket.id)}>Cancel Ticket</button>
          </div>
        ))}
      </div>
      <button className="logout-button">Log Out</button>
    </div>
  );
}