
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
const BookingPage = () => {
  const [studentName, setStudentName] = useState('');
  const [courtNumber, setCourtNumber] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [status,setStatus] = useState([]);
  //const [isAvailable,setIsAvailable] = useState(true);


  //This variable represents the maximum number of courts
  //(Here)The court number should be either 1 or 2 or 3
  const numberOfCourts = 3;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!studentName || !courtNumber || !timeSlot ) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    if(courtNumber>numberOfCourts || courtNumber<=0){
      setErrorMessage('please enter valid court number,courts 1,2 and 3 are available');
      return;
    }
    
    const slotCode = timeSlot+courtNumber;

    if(status.includes(slotCode)){
      setErrorMessage('Sorry the slot is not available, please choose another slot');;
      return;
    }

    const newBooking = {
      studentName,
      courtNumber,
      timeSlot,
    };

    axios
      .post('http://localhost:5000/bookings', newBooking)
      .then((response) => {
        console.log(response.data);
        setStudentName('');
        setCourtNumber('');
        setTimeSlot('');
        setErrorMessage('');
        setStatus([...status,slotCode]);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage('An error occurred. Please try again later.');
      });
  };

  return (
    <div className="container">
      <h1>Booking Page</h1>
      {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Student Name:</label>
          <input
            type="text"
            className="form-control"
            value={studentName}
            onChange={(event) => setStudentName(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Court Number:</label>
          <input
            type="number"
            className="form-control"
            value={courtNumber}
            onChange={(event) => {
              setErrorMessage('');
              setCourtNumber(event.target.value)}}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Time Slot:</label>
          <select
            className="form-select"
            value={timeSlot}
            onChange={(event) => {
              setErrorMessage('');  
              setTimeSlot(event.target.value)}
            }
          >
            <option value="">Select a time slot</option>
            <option value="a">02:30-03:45</option>
            <option value="b">03:45-04:30</option>
            <option value="c">04:30-05:30</option>
          </select>
        </div>
        
        {/* {

          !isAvailable && 
          <div class="alert alert-warning" role="alert">
            A simple warning alert—check it out!
          </div>
        } */}

        <button type="submit" className="btn btn-primary">Book Now</button>
      </form>
    </div>
  );
};

export default BookingPage;
