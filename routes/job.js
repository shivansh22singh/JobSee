const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

router.post("/create", async (req, res) => {
  try {
    const { title, description, range, userId, skills, vacancy } = req.body;

    let job = new Job({
      title,
      description,
      range,
      userId,
      skills,
      vacancy,
    });

    job.save();

    res.status(201).json({ message: "New job created" });
  } catch (err) {
    res.status(500).send(`Server Error ${err}`);
    console.error(err);
  }
});

router.post("/get", async (req, res) => {
  const { range, skills, title } = req.body;

  try {
    console.log(skills);

    const jobs = await Job.find({
      range: { $gte: range },
      skills: { $in: skills },
      title: { $regex: `${title}`, $options: "gi" },
      vacancy: { $gt: 0 },
    });

    if (jobs.length === 0)
      return res
        .status(200)
        .json({ message: "There are no available jobs for you" });

    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).send(`Server Error ${err}`);
    console.error(err);
  }
});

router.get("/", async (req, res) => {
  try {
    console.log(skills);

    const jobs = await Job.find();

    if (jobs.length === 0)
      return res
        .status(200)
        .json({ message: "There are no available jobs for you" });

    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).send(`Server Error ${err}`);
    console.error(err);
  }
});

module.exports = router;
