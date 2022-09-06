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
// router.post('/CahngeToCorrect', asyncHandler(async (req, res) => {
//   const answer = req.body;
//   const data = await controller.MarkAsCorrectAnswer(answer);
//   res.send(data);
// }));

router.post
(
  "/ChangeAnswersState",
  asyncHandler(async (req, res) => {
    const {questionId} = req.params;
    const data = await controller.ChangeAnswersState(questionId)
    res.send(data);
  })
);

router.post
(
  "/SetCorrectAnswer",
  asyncHandler(async (req, res) => {
    const {questionId} = req.params;
    const data = await controller.SetCorrectAnswer(answerId)
    res.send(data);
  })
);


module.exports = router;