const Doctor = require("../models/doctor.model");

exports.findAllDoctors = async (req, res) => {
  console.log("Finding All Doctors");

  try {
    const result = await Doctor.find().populate("specialization").populate("clinic");
    res.status(200).json({ status: true, data: result });
  } catch (error) {
    console.log("Error in finding all Teachers", error);
    res.status(404).json({ status: false, data: error });
  }
};


exports.findFirstEightDoctors = async (req, res) => {
  console.log("Finding All Doctors");

  try {
    const result = await Doctor.find().limit(8).populate("specialization").populate("clinic");
    res.status(200).json({ status: true, data: result });
  } catch (error) {
    console.log("Error in finding all Teachers", error);
    res.status(404).json({ status: false, data: error });
  }
};

exports.findDoctorByLastname = async (req, res) => {
  let lastname = req.params.lastname;
  console.log("Finding Doctor with lastname ", lastname);

  
  try {
    const result = await Doctor.findOne({ lastname: lastname }).populate("specialization").populate("clinic");
    res.status(200).json({ status: true, data: result });
  } catch (error) {
    console.log("Error in finding doctor with lastname :", lastname);
    res.status(404).json({ status: false, data: error });
  }
};

exports.createDoctor = async (req, res) => {
  let data = req.body;

  const newDoctor = new Doctor({
   firstname: data.firstname,
   lastname: data.lastname,
   experience: data.experience,
   image: data.image,
   cv: data.cv,
   amka: data.amka,
   specialization: data.specialization,
   clinic: data.clinic,
  //  availableHours: data.availableHours || []
  });

  try {
    const result = await newDoctor.save()
    res.status(200).json({status: true, data: result})
  } catch (error) {
    console.log('Error in creating new Doctor', error)
    res.status(404).json({status: false, data: error})
  }
};


exports.updateDoctor = async(req,res)=>{
    let id = req.params.id
    const updatedDoctor = req.body

    try {
        const result = await Doctor.findByIdAndUpdate( id, updatedDoctor, {new:true})
         res.status(200).json({status:true, data: result})
    } catch (error) {
         console.log('error in updating a Doctor', error)
        res.status(400).json({status: false, data: error})
    }
}


exports.deleteDoctorById = async(req,res)=>{
    let id = req.params.id

    try {
        const result = await Doctor.findByIdAndDelete(id)
        res.status(200).json({status:true,data: result})
    } catch (error) {
        console.log("Error in delete the doctor", error)
        res.status(404).json({status:false,data:error})
    }
}

exports.findDoctorsBySpecialization = async (req, res) => {
    const specialization = req.params.specialization;

    try {
        const result = await Doctor.find({ specialization: specialization }).populate('user');
        res.status(200).json({ status: true, data: result});
    } catch (error) {
        console.error("Error finding doctors by specialization:", error);
        res.status(500).json({ status: false, error: error.message});
    }
};