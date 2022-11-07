const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
  },
  contactNumber: {
    type: String,
    required: true,
    unique: true,
  },
  userPicture: String,
  IMEI: [
    {
      type: String,
      unique: true,
      required: true,
    },
  ],
  role: Number,
  OTP: Number,
});

module.exports = mongoose.model("User", UserSchema);
