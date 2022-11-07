const express = require("express");
const router = express.Router();
const User = require("../models/User");
const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
  {
    lazyLoading: true,
  }
);

router.post("/login", async (req, res) => {
  try {
    function generateOTP() {
      var digits = "0123456789";
      let OTP = "";
      for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
      }
      return OTP;
    }

    const { contactNumber, IMEI } = req.body;

    if (!contactNumber.startsWith("+")) {
      contactNumber = `+91${contactNumber}`;
    }

    let user = await User.findOne({ contactNumber });

    const OTP = generateOTP();

    console.log(OTP);

    client.messages
      .create({
        body: `Your OTP is ${OTP}`,
        to: contactNumber,
        from: process.env.TWILIO_NUMBER,
      })
      .then((message) => console.log(message))
      .catch((error) => console.log(error));

    if (!user) {
      const arrIMEI = [{ IMEI }];

      const newUser = new User({
        contactNumber,
        arrIMEI,
        OTP,
      });

      await newUser.save();
    } else {
      user.OTP = OTP;

      await user.save();
    }

    res.status(201).json({ message: "OTP sent" });
  } catch (err) {
    res.status(500).send(`Server Error ${err}`);
    console.error(err);
  }
});

router.post("/login/otpCheck", async (req, res) => {
  try {
    const { contactNumber, OTP } = req.body;

    if (!contactNumber.startsWith("+")) {
      contactNumber = `+91${contactNumber}`;
    }

    const user = await User.findOne({ contactNumber });

    if (!user) return res.status(404).json({ message: "User Not Found" });

    if (user.OTP !== OTP) return res.status(400).json({ message: "Wrong OTP" });

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).send(`Server Error ${err}`);
    console.error(err);
  }
});

router.post("/create", async (req, res) => {
  try {
    const { OTP } = req.body;

    if (!contactNumber.startsWith("+")) {
      contactNumber = `+91${contactNumber}`;
    }

    const user = await User.findOne({ contactNumber });

    if (!user) return res.status(404).json({ message: "User Not Found" });

    if (user.OTP !== OTP) return res.status(400).json({ message: "Wrong OTP" });

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).send(`Server Error ${err}`);
    console.error(err);
  }
});

module.exports = router;
