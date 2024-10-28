import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../utils/api';

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${id}`);
        setEvent(res.data);
        setTotalPrice(res.data.price);
      } catch (err) {
        toast.error('Failed to fetch event details');
      }
    };

    fetchEvent();
  }, [id]);

  useEffect(() => {
    if (event) {
      setTotalPrice(event.price * quantity);
    }
  }, [quantity, event]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= event.availableTickets) {
      setQuantity(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const confirmBooking = async () => {
    try {
      await api.post('/tickets', { eventId: id, quantity });
      toast.success('Booking confirmed!');
      navigate('/profile');
    } catch (err) {
      toast.error(err.response.data.msg || 'Failed to book tickets');
    }
  };

  if (!event) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Book Tickets</h1>
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-4">{event.title}</h2>
        <p className="text-gray-600 mb-4">📅 Date: {new Date(event.date).toLocaleDateString()}</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-gray-700 font-bold mb-2">
              Number of Tickets
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              max={event.availableTickets}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <p className="text-xl font-bold">Total Price: ${totalPrice.toFixed(2)}</p>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300"
          >
            Confirm Booking
          </button>
        </form>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Confirm Booking</h2>
            <p className="mb-4">Are you sure you want to book {quantity} ticket(s) for {event.title}?</p>
            <p className="mb-6 font-semibold">Total: ${totalPrice.toFixed(2)}</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmBooking}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}