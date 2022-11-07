const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config({ path: "./config.env" });

const app = express();

connectDB();

app.use(cors());
app.use(express.json({ extented: false }));

app.use("/api/v1/user", require("./routes/user"));
app.use("/api/v1/job", require("./routes/job"));
app.use("/api/v1/heathCheck", async (req, res) => {
  res.status(200).send("ApplicationRunning");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running at ${PORT}`));
