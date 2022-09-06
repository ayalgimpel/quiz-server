const express = require("express");
const router = express.Router();
const asyncHandler = require("../helpers/asyncHandler");
const controller = require('../controller/report');

router.get("/", asyncHandler(async (req, res) => {
    const { quizId, from, to } = req.query;
    const report = await controller.getReport({ quizId, from, to });
    res.send(report);
})
);
module.exports = router;