const express = require("express");
const router = express.Router();
const controller = require("../controller/institutes");
const asyncHandler = require("../helpers/asyncHandler");

// Get questions from json
router.get(
  "/Institutes",
  asyncHandler(async (req, res) => {
    const data = await controller.getAllInstitutes();

    res.send(data);
  })
);
module.exports = router;