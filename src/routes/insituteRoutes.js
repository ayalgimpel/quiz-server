const express = require("express");
const router = express.Router();
const controller = require("../controller/institutes");
const asyncHandler = require("../helpers/asyncHandler");


router.get(
  "/",
  asyncHandler(async (req, res) => {
    const data = await controller.GetAllInstitutes();
    res.send(data);
  })
);

module.exports = router;