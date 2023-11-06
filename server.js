
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect('mongodb://localhost:27017/mydb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// Booking Model
const BookingSchema = new mongoose.Schema({
  studentName: String,
  courtNumber: Number,
  timeSlot: String,
  status: String,
  bookingDate: { type: Date, default: Date.now },
});

const Booking = mongoose.model('Booking', BookingSchema);

// API Endpoints
app.get('/bookings', (req, res) => {
  Booking.find()
    .then((bookings) => res.json(bookings))
    .catch((err) => res.status(400).json({ error: err.message }));
});

app.post('/bookings', (req, res) => {
  const { studentName, courtNumber, timeSlot } = req.body;

  const newBooking = new Booking({
    studentName,
    courtNumber,
    timeSlot,
    status: 'Pending',
    bookingDate: new Date(),
  });

  newBooking
    .save()
    .then(() => res.json({ message: 'Booking added!' }))
    .catch((err) => res.status(400).json({ error: err.message }));
});

app.put('/bookings/:id', (req, res) => {
  Booking.findByIdAndUpdate(req.params.id, { status: req.body.status })
    .then(() => res.json({ message: 'Booking updated!' }))
    .catch((err) => res.status(400).json({ error: err.message }));
});

app.delete('/bookings/:id', (req, res) => {
  Booking.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: 'Booking deleted!' }))
    .catch((err) => res.status(400).json({ error: err.message }));
});

// Start Server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});