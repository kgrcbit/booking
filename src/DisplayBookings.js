
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DisplayBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/bookings');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/bookings/${bookingId}`, { status: newStatus });
      fetchData();
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  return (
    <div>
      <h2>Bookings:</h2>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Student Name</th>
            <th scope="col">Court Number</th>
            <th scope="col">Time Slot</th>
            <th scope="col">Booking Date</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.studentName}</td>
              <td>{booking.courtNumber}</td>
              <td>{booking.timeSlot}</td>
              <td>{booking.bookingDate}</td>
              <td>{booking.status}</td>
              <td>
                {booking.status === 'Pending' && (
                  <>
                    <button
                      className="btn btn-success mr-2"
                      onClick={() => handleStatusChange(booking._id, 'Approved')}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleStatusChange(booking._id, 'Rejected')}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayBookings;