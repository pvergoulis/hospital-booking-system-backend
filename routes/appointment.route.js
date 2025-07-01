const express = require('express')
const router = express.Router()
const appointmentController = require('../controllers/appointment.controller')

const verifyToken = require('../middlewares/auth.middleware').verifyToken
const verifyRoles = require('../middlewares/auth.middleware').verifyRoles

router.get('/',verifyToken, verifyRoles("ADMIN"), appointmentController.findAllAppointments)
router.get("/doctor/:doctorId",verifyToken, appointmentController.getAppointmentsByDoctor);
router.post('/book', verifyToken, appointmentController.bookAppointment); 
router.get('/user', verifyToken, appointmentController.getAppointments);  
router.patch('/update-past-pending', verifyToken, appointmentController.updatePastPendingAppointments);
router.patch("/:id/status", verifyToken, verifyRoles("ADMIN"),appointmentController.updateAppointmentStatus);
router.delete('/cancel/:id', verifyToken, appointmentController.cancelAppointment); 


module.exports = router