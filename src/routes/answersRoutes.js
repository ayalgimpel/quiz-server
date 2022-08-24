const express = require("express");
const router = express.Router();
const controller = require("../controller/answers");
const asyncHandler = require("../helpers/asyncHandler");

// Get questions from json
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const data = await controller.getAllAnswers();

    res.send(data);
  })
);
module.exports = router;