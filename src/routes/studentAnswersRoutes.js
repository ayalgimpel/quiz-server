const express = require("express");
const router = express.Router();
const controller = require("../controller/studentAnswers");
const asyncHandler = require("../helpers/asyncHandler");

// Get questions from json
router.post("/", asyncHandler(async (req, res) => {
    try {
        const { StudentQuizes_Id, Qustion_Id, Answer_Id } = req.body;
        const data = await controller.CreateOrUpdateStudentAnswer({ StudentQuizes_Id, Qustion_Id, Answer_Id, CreatedDate: new Date() });
        res.status(200).send(data);
    } catch (err) {
        res.status(400).send(err);
    }
}));

router.get("/", asyncHandler(async (req, res) => {
    const { Quiz_Id, Student_Id, studentQuizId } = req.query;
    const data = await controller.GetStudnetAnswers({ Quiz_Id, Student_Id, StudentQuiz_Id: studentQuizId });
    res.send(data);
})
);
module.exports = router;