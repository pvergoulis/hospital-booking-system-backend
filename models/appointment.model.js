const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let appointmentSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  timeSlot: {
    type: String, 
    required: true
  },
  status: {
    type: String,
    enum: ['PENDING', 'CONFIRMED', 'CANCELED'],
    default: 'PENDING'
  }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
