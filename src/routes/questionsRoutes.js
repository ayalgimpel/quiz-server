const express = require("express");
const router = express.Router();
const controller = require("../controller/questions");
const asyncHandler = require("../helpers/asyncHandler");

// Get questions from json
router.get("/", asyncHandler(async (req, res) => {
  const data = await controller.getAllQuestions();

  res.send(data);
}));

// Add question to the list in json
router.post("/", asyncHandler(async (req, res) => {
  try {
    const data = await controller.addQuestion(req.body);
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err);
  }
}));


router.get('/:questionId/answers', asyncHandler(async (req, res) => {
  try {

    const { questionId } = req.params;
    const data = await controller.GetAnswersByQuestionId(questionId);
    
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}))

//router.get(
// "/getById",
// asyncHandler(async (req, res) => {
//   const data = await controller.GetQustionById(req.query.Id);
//   res.send(data);
// })
//);

//router.get(
//  "/getById",
//  asyncHandler(async (req, res) => {
//   console.log(req.query.Id);
//   const { Id } = req.query;
//   const data = await controller.GetQustionById(Id);
//  res.send(data);
// })
//);

module.exports = router;
