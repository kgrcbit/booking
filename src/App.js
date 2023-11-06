import React from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './LoginPage';
import RegistrationPage from './RegistrationPage';
import BookingPage from './BookingPage';
import DisplayBookings from './DisplayBookings';

const App = () => {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">Logo</Link>
        </div>
      </nav>
      <div className="container mt-5">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link to="/" className="nav-link" aria-current="page">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/booking" className="nav-link">Booking</Link>
          </li>
          <li className="nav-item">
            <Link to="/displaybookings" className="nav-link">Display Bookings</Link>
          </li>
        </ul>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/displaybookings" element={<DisplayBookings />} />
        </Routes>
      </div>
    </Router>
  );
};

const HomePage = () => {
  return (
    <div className="text-center">
      <h1>Welcome to Our Website</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquet malesuada urna, non luctus velit fermentum nec.</p>
    </div>
  );
};

export default App;