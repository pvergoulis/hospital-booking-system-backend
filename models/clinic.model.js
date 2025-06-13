const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const clinicSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Clinic", clinicSchema);
