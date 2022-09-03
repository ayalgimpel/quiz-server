const express = require("express");
const router = express.Router();
const controller = require("../controller/studentQuizes");
const asyncHandler = require("../helpers/asyncHandler");

// Get questions from json
router.post("/", asyncHandler(async (req, res) => {
    try {
        const { Quiz_Id, Student_Id } = req.body;
        const data = await controller.CreateStudentQuiz({ Quiz_Id, Student_Id, CreatedDate: new Date() });
        res.status(200).send(data);
    } catch (err) {
        res.status(400).send(err);
    }
}));
module.exports = router;