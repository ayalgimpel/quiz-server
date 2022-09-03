const express = require("express");
const router = express.Router();
const controller = require("../controller/studentAnswers.js");
const asyncHandler = require("../helpers/asyncHandler");

// Get questions from json
router.post("/", asyncHandler(async (req, res) => {
    try {
        const { Quiz_Id, Student_Id ,Answer_Id} = req.body;
        const data = await controller.CreateStudentAnswer({ Quiz_Id, Student_Id,Answer_Id, CreatedDate: new Date() });
        res.status(200).send(data);
    } catch (err) {
        res.status(400).send(err);
    }
}));
module.exports = router;