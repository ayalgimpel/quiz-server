const express = require("express");
const router = express.Router();
const controller = require("../controller/students");
const asyncHandler = require("../helpers/asyncHandler");

// Get questions from json
router.get(
  "/Students",
  asyncHandler(async (req, res) => {
    const data = await controller.getAllStudents();

    res.send(data);
  })
);
module.exports = router;