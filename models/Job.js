const mongoose = require("mongoose");
const User = require("./User");

const JobSchema = mongoose.Schema({
  title: String,
  description: String,
  skills: [String],
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: User,
  },
  range: Number,
  vacancy: Number,
});

module.exports = mongoose.model("Job", JobSchema);
