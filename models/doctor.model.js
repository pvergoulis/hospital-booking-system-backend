const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let doctorSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type:String,
    required: true
  },
  image: {
    type: String
  },
  experience : {
    type : String
  },
  cv: {
    type: String
  },
  specialization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
   clinic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clinic'
  },
  amka:{
    type:String,
    required: true,
    unique: true,
    minlength: 11,
    maxlength: 11
  },

  availableHours: [
    {
      day: { type: String },
      from: { type: String },
      to: { type: String },
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("Doctor", doctorSchema);

