const mongoose = require("mongoose");

const EmployeeSchema = mongoose.Schema({
  title: String,
  description: String,
  skills: [String],
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: User,
  },
  range: Number,
});

module.exports = mongoose.model("Job", JobSchema);
