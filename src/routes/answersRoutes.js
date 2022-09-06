const express = require("express");
const router = express.Router();
const controller = require("../controller/answers");
const asyncHandler = require("../helpers/asyncHandler");

// Get questions from json
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const data = await controller.GetAllAnswers();
    res.send(data);
  })
);
router.get
(
  "/answerForQuestion/:questionId",
  asyncHandler(async (req, res) => {
    const {questionId} = req.params;
    const data = await controller.GetQuestionAnswer(questionId)
    res.send(data);
  })
);

router.post('/', asyncHandler(async (req, res) => {
  const answer = req.body;
  const data = await controller.AddAnswer(answer);
  res.send(data);
}));
router.delete
(
  "/DeleteAnswer/:answerId",
  asyncHandler(async (req, res) => {
    const {answerId} = req.params;
    const data = await controller.DeleteAnswer(answerId)
    res.send(data);
  })
);

router.post
(
  "/ChangeAnswersState",
  asyncHandler(async (req, res) => {
    const {questionId,answerId} = req.body;
    const data = await controller.ChangeAnswersState(questionId,answerId)
    res.send(data);
  })
);



module.exports = router;