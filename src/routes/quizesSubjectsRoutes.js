const express = require("express");
const router = express.Router();
const controller = require("../controller/quizesSubjects");
const asyncHandler = require("../helpers/asyncHandler");

// Get questions from json
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const data = await controller.getAllSubjects();

    res.send(data);
  })
);
module.exports = router;