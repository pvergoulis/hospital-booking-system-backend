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
  experience : {
    type : String
  },
  cv: {
    type: String
  },
  specialization: {
    type: String,
    required: true,
  },
  amka:{
    type:String,
    required: true,
    unique: true
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

