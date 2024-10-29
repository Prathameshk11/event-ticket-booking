import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../utils/api';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

function Profile() {
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const [ticketToCancel, setTicketToCancel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await api.get('/auth/me');
        setUser(userResponse.data);
        
        const ticketsResponse = await api.get('/tickets/mytickets');
        setTickets(ticketsResponse.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Error fetching user data. Please try again later.');
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleCancelTicket = (ticket) => {
    setTicketToCancel(ticket);
    setShowCancelConfirmation(true);
  };

  const confirmCancelTicket = async () => {
    if (!ticketToCancel) return;

    setIsLoading(true);
    try {
      await api.delete(`/tickets/${ticketToCancel._id}`);
      setTickets(tickets.filter((t) => t._id !== ticketToCancel._id));
      toast.success('Ticket cancelled successfully');
    } catch (error) {
      console.error('Error cancelling ticket:', error);
      toast.error('Error cancelling ticket. Please try again later.');
    } finally {
      setIsLoading(false);
      setShowCancelConfirmation(false);
      setTicketToCancel(null);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!user) {
    return <div className="text-center py-8">User not found. Please log in.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">User Information</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">My Tickets</h2>
        {tickets.length === 0 ? (
          <p>You haven't booked any tickets yet.</p>
        ) : (
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <div key={ticket._id} className="border-b pb-4">
                <h3 className="text-xl font-semibold">{ticket.event && ticket.event.title ? ticket.event.title : 'Event title not available'}</h3>
                <p>Date: {ticket.event && ticket.event.date ? new Date(ticket.event.date).toLocaleDateString() : 'Date not available'}</p>
                <p>Quantity: {ticket.quantity}</p>
                <p>Total Price: ${ticket.totalPrice.toFixed(2)}</p>
                <button
                  onClick={() => handleCancelTicket(ticket)}
                  className="mt-2 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors duration-300"
                >
                  Cancel Ticket
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {showCancelConfirmation && ticketToCancel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Confirm Cancellation</h2>
            <p className="mb-4">Are you sure you want to cancel your ticket for {ticketToCancel.event && ticketToCancel.event.title ? ticketToCancel.event.title : 'this event'}?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowCancelConfirmation(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                disabled={isLoading}
              >
                No, Keep Ticket
              </button>
              <button
                onClick={confirmCancelTicket}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                disabled={isLoading}
              >
                {isLoading ? 'Cancelling...' : 'Yes, Cancel Ticket'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProfileWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <Profile />
    </ErrorBoundary>
  );
}