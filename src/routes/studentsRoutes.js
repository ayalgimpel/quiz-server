const express = require("express");
const router = express.Router();
const controller = require("../controller/students");
const asyncHandler = require("../helpers/asyncHandler");

// Get questions from json
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const data = await controller.getAllStudents();

    res.send(data);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { First_Name, Last_Name, Email, phone } = req.body;
    const data = await controller.createStudent({ First_Name, Last_Name, Email, phone, createdDate: new Date() });

    res.send(data);
  })
);
module.exports = router;