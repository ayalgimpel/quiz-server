const express = require("express");
const router = express.Router();
const controller = require("../controller/quizes");
const asyncHandler = require("../helpers/asyncHandler");

// Get questions from json
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const data = await controller.getAllQuizes();
    res.send(data);
  })
);
router.get(
  "/getById",
  asyncHandler(async (req, res) => {
    const data = await controller.GetQuizById(req.query.Id);
    res.send(data);
  })
);

 router.delete(
  "/deleteQuiz",
  asyncHandler(async (req, res) => {
    const response = await controller.DeleteQuiz(req.query.quizID);
    if (response.error)
      return res.status(500).send(response)

    return res.status(200).send(response);
  })
)

router.get(
  "/getById",
  asyncHandler(async (req, res) => {
    const data = await controller.GetQuizById(req.query.Id);
    res.send(data);
  })
);

router.get(
  "/getByQuizeCode",
  asyncHandler(async (req, res) => {
    const { quizeCode } = req.query;
    const data = await controller.GetQuizByQuizCode(quizeCode);
    res.send(data);
  })
);


router.get('/:quizId/questions',
  asyncHandler(async (req, res) => {
    const { quizId } = req.params;
    const data = await controller.GetQuestionsByQuizId(quizId);
    res.send(data);
  }));

module.exports = router;