const express = require("express");
const router = express.Router();
const controller = require("../controller/questions");
const asyncHandler = require("../helpers/asyncHandler");

router.get("/", asyncHandler(async (req, res) => {
  const data = await controller.GetAllQuestions();
  res.send(data);
}));

router.post("/", asyncHandler(async (req, res) => {
  try {
    const data = await controller.AddQuestion(req.body);
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

router.get(
"/getById/:id",
asyncHandler(async (req, res) => {
  const {id} = req.params;
  const data = await controller.GetQustionById(id);
  res.send(data);
})
);
router.delete(

   `/deleteQuestion/:questionId`,
   asyncHandler(async (req, res) => {
    const {questionId} = req.params;
    const data = await controller.DeleteQuestion(questionId);
    if (data.error){
      return res.status(500).send(data)
    }
    return res.status(200).send(data);
  })
)



module.exports = router;
