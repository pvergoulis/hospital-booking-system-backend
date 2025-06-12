const Appointment = require('../models/appointment.model');
const Doctor = require('../models/doctor.model');
const  {sendEmail } = require('../utils/emailService');

exports.bookAppointment = async (req, res) => {
    try {
        const { doctorId, date, timeSlot } = req.body;
        const userId = req.user.id;

        const doctorExists = await Doctor.findById(doctorId);
        if (!doctorExists) return res.status(404).json({ message: 'Doctor not found' });

        const newAppointment = new Appointment({
            user: userId,
            doctor: doctorId,
            date,
            timeSlot,
            status: 'PENDING'
        });

        await newAppointment.save();

        
        const userEmail = req.user.email;
        await sendEmail(userEmail, 'Appointment Confirmation', `Your appointment with Dr. ${doctorExists.firstname} is booked for ${date} at ${timeSlot}.`);

        res.status(201).json({ message: 'Appointment booked successfully', appointment: newAppointment });
    } catch (error) {
        console.error("Booking error:", error);
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getAppointments = async (req, res) => {
    try {
        const userId = req.user.id;
        const appointments = await Appointment.find({ user: userId }).populate('doctor');
        res.status(200).json({ appointments });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.cancelAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const appointment = await Appointment.findById(id)
            .populate('doctor', 'firstname lastname')
            .populate('user', '_id email');

        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

        
        if (appointment.user._id.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized action' });
        }

        await appointment.deleteOne();

        const userEmail = appointment.user.email;
        const doctorName = appointment.doctor ? `${appointment.doctor.firstname} ${appointment.doctor.lastname}` : 'the doctor';

        if (userEmail) {
            await sendEmail(
                userEmail,
                'Appointment Cancellation',
                `Your appointment with Dr. ${doctorName} on ${appointment.date} at ${appointment.timeSlot} has been canceled.`
            );
        }

        res.status(200).json({ message: 'Appointment canceled successfully' });
    } catch (error) {
        console.error("❌ Cancel error:", error);
        res.status(500).json({ message: 'Server error', error });
    }
};
