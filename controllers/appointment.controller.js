const Appointment = require("../models/appointment.model");
const Doctor = require("../models/doctor.model");
const { sendEmail } = require("../utils/emailService");

exports.findAllAppointments = async (req, res) => {
  console.log("Finding all appointments");

  try {
    const result = await Appointment.find().populate("doctor").populate("user");
    res.status(200).json({ status: true, data: result });
  } catch (error) {
    console.log("Error in finding all appointments");
    res.status(400).json({ statsu: false, data: error });
  }
};

exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, timeSlot } = req.body;
    const userId = req.user.id;

    const doctorExists = await Doctor.findById(doctorId);
    if (!doctorExists)
      return res.status(404).json({ message: "Doctor not found" });

    const newAppointment = new Appointment({
      user: userId,
      doctor: doctorId,
      date,
      timeSlot,
      status: "PENDING",
    });

    await newAppointment.save();

    const userEmail = req.user.email;
    await sendEmail(
      userEmail,
      "Appointment Confirmation",
      `Your appointment with Dr. ${doctorExists.firstname} is booked for ${date} at ${timeSlot}.`
    );

    res
      .status(201)
      .json({
        message: "Appointment booked successfully",
        appointment: newAppointment,
      });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const userId = req.user.id;
    const appointments = await Appointment.find({ user: userId }).populate(
      "doctor"
    );
    res.status(200).json({ appointments });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const appointment = await Appointment.findById(id)
      .populate("doctor", "firstname lastname")
      .populate("user", "_id email");

    if (!appointment)
      return res.status(404).json({ message: "Appointment not found" });

    if (appointment.user._id.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    await appointment.deleteOne();

    const userEmail = appointment.user.email;
    const doctorName = appointment.doctor
      ? `${appointment.doctor.firstname} ${appointment.doctor.lastname}`
      : "the doctor";

    if (userEmail) {
      await sendEmail(
        userEmail,
        "Appointment Cancellation",
        `Your appointment with Dr. ${doctorName} on ${appointment.date} at ${appointment.timeSlot} has been canceled.`
      );
    }

    res.status(200).json({ message: "Appointment canceled successfully" });
  } catch (error) {
    console.error(" Cancel error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getAppointmentsByDoctor = async (req, res) => {
  const { doctorId } = req.params;

  try {
    const appointments = await Appointment.find({ doctor: doctorId })
      .populate("user", "firstname lastname")
      .populate("doctor", "firstname lastname specialization");

    res.status(200).json({ status: true, data: appointments });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};


exports.updatePastPendingAppointments = async (req, res) => {
  try {
    const now = new Date();

    const pendingAppointments = await Appointment.find({ status: "PENDING" });

    const appointmentsToUpdate = pendingAppointments.filter((appt) => {
      const apptDateTime = new Date(appt.date);
      const [startHour, startMinute] = appt.timeSlot.split(" - ")[0].split(":");

      if (startHour && startMinute) {
        apptDateTime.setHours(Number(startHour), Number(startMinute), 0, 0);
        return apptDateTime <= now;
      }

      return false;
    });

    await Promise.all(
      appointmentsToUpdate.map(async (appt) => {
        appt.status = "CONFIRMED";
        await appt.save();
      })
    );

    res
      .status(200)
      .json({ message: `${appointmentsToUpdate.length} appointments updated` });
  } catch (error) {
    console.error("Error updating pending appointments:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


exports.updateAppointmentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const allowedStatuses = ['PENDING', 'CONFIRMED', 'CANCELED', 'REJECTED', 'ACCEPTED', 'DONE'];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const appointment = await Appointment.findById(id)
      .populate("user", "email firstname")
      .populate("doctor", "firstname lastname");

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = status;
    await appointment.save();

    
    await sendEmail(
      appointment.user.email,
      "Appointment Status Updated",
      `Your appointment with Dr. ${appointment.doctor.firstname} ${appointment.doctor.lastname} on ${appointment.date} at ${appointment.timeSlot} is now ${status}.`
    );

    res.status(200).json({ message: "Status updated", appointment });
  } catch (error) {
    console.error("Update status error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.updateAppointmentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const allowedStatuses = [
    "PENDING",
    "CONFIRMED",
    "CANCELED",
    "REJECTED",
    "ACCEPTED",
    "DONE",
  ];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const appointment = await Appointment.findById(id)
      .populate("user", "email firstname")
      .populate("doctor", "firstname lastname");

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = status;
    await appointment.save();

    await sendEmail(
      appointment.user.email,
      "Appointment Status Updated",
      `Your appointment with Dr. ${appointment.doctor.firstname} ${appointment.doctor.lastname} on ${appointment.date} at ${appointment.timeSlot} is now ${status}.`
    );

    res.status(200).json({ message: "Status updated", appointment });
  } catch (error) {
    console.error("Update status error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
