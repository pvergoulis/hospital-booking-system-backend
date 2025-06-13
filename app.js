const express = require('express')
const app = express()
const cors = require('cors')


app.use(express.json())
app.use(express.urlencoded({extended:false}))


const clinic = require('./routes/clinic.route')
const category = require('./routes/category.route')
const user = require('./routes/user.route')
const doctor = require('./routes/doctor.route')
const auth = require('./routes/auth.route')
const appointmentRoutes = require('./routes/appointment.route');

app.use(cors({
 origin : "*"
}))

app.use('/api/clinics', clinic)
app.use('/api/categories',category)
app.use('/api/appointments', appointmentRoutes);
app.use('/api/users',user)
app.use('/api/doctors',doctor)
app.use('/api/auth',auth)

module.exports = app