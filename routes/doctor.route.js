const express= require('express')
const router = express.Router()

const doctorController = require('../controllers/doctor.controller')
const verifyToken = require('../middlewares/auth.middleware').verifyToken
const verifyRoles = require('../middlewares/auth.middleware').verifyRoles

router.get('/', verifyToken,doctorController.findAllDoctors)
router.get('/:lastname',verifyToken, doctorController.findDoctorByLastname)
router.get('/:specialization',verifyToken, doctorController.findDoctorsBySpecialization)
router.post('/create', verifyToken, verifyRoles("ADMIN"),doctorController.createDoctor)
router.patch('/update:id',verifyToken,verifyRoles("ADMIN"), doctorController.updateDoctor)
router.delete('/delete:id',verifyToken,verifyRoles("ADMIN"),doctorController.deleteDoctorById)

module.exports  = router

