const express = require('express')
const router = express.Router()

const clinicController = require('../controllers/clinic.controller')

router.get('/', clinicController.findAllClinics)
router.get('/:name', clinicController.findClinicByName)
router.post('/create', clinicController.createClinic)



module.exports = router