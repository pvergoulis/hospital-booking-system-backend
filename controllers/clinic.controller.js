const Clinic = require('../models/clinic.model')


exports.findAllClinics = async(req,res)=>{
    console.log('Finding all clinics')

    try {
        const result = await Clinic.find()
        res.status(200).json({status :true, data : result})
    } catch (error) {
        console.log('Error in finding all Clinics')
        res.status(400).json({status: false, data: error})
        
    }
}

exports.findClinicByName = async(req,res)=>{
    let name = req.params
    console.log('Finding clinic with name ', name)

    try {
        const result = await Clinic.findOne({name : name})
        res.status(200).json({status: true, data: result})
    } catch (error) {
        console.log('Error in finding the specific clinic')
        res.status(400).json({status: false, data: error})
    }
}

exports.createClinic = async(req ,res) =>{
    data = req.body

    const newClinic = new Clinic({
        name : data.name
    })

    try {
        const result = await newClinic.save()
        res.status(200).json({status: true, data: result})
    } catch (error) {
        console.log('Error in creating new Clinic')
        res.status(400).json({status : false, data: error})
    }
}