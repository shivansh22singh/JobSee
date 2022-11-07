const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

router.post("/create", async (req, res) => {
  try {
    const { title, description, range, userId, skills } = req.body;

    let employee = new Employee({
      title,
      description,
      range,
      userId,
      skills,
    });

    employee.save();

    res.status(201).json({ message: "New Employee created" });
  } catch (err) {
    res.status(500).send(`Server Error ${err}`);
    console.error(err);
  }
});

router.post("/get", async (req, res) => {
  const { range, skills, title } = req.body;

  try {
    console.log(skills);

    const employees = await Employee.find({
      range: { $gte: range },
      skills: { $in: skills },
      title: { $regex: `${title}`, $options: "gi" },
    });

    if (employees.length === 0)
      return res
        .status(200)
        .json({ message: "There are no available jobs for you" });

    res.status(200).json(employees);
  } catch (err) {
    res.status(500).send(`Server Error ${err}`);
    console.error(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();

    if (employees.length === 0)
      return res
        .status(200)
        .json({ message: "There are no available jobs for you" });

    res.status(200).json(employees);
  } catch (err) {
    res.status(500).send(`Server Error ${err}`);
    console.error(err);
  }
});

module.exports = router;
