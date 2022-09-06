const express = require("express");
const router = express.Router();
const controller = require("../controller/studentQuizes");
const asyncHandler = require("../helpers/asyncHandler");

// Get questions from json
router.post("/", asyncHandler(async (req, res) => {
    try {
        const { Quiz_Id, Student_Id } = req.body;
        const data = await controller.CreateStudentQuiz({ Quiz_Id, Student_Id, CreatedDate: new Date(), finished: false });
        res.status(200).send(data);
    } catch (err) {
        res.status(400).send(err);
    }
}));

router.get('/:studentQuizId/result', asyncHandler(async (req, res) => {
    try {
        const { studentQuizId } = req.params;
        const quizResult = await controller.GetQuizResult(studentQuizId);
        res.status(200).send(quizResult);
    } catch (error) {
        console.log(error);
        return res.status(500).send(response.error);
    }
}));

router.post("/:studentQuizId/finish", asyncHandler(async (req, res) => {
    try {
        const { studentQuizId } = req.params;
        const data = await controller.update(studentQuizId, { finished: true, finishedDate: new Date() });
        res.status(200).send(data);
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}));


module.exports = router;