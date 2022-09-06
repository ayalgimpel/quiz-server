const db = require("../Repository/db.answersRepository");

class AnswersController {
  
  GetQuestionAnswer(questionId){
    return db.GetAllAnswers(questionId);
  }
  AddAnswer(answer){
    return db.AddAnswer(answer);
  }
  // MarkAsCorrectAnswer(answer){
  //   return db.MarkAsCorrectAnswer(answer)
  // }
  ChangeAnswersState(questionId){
    return db.ChangeAnswersState(questionId)
  }
  SetCorrectAnswer(answerId){
    return db.SetCorrectAnswer(answerId)
  }

}
module.exports = new AnswersController();
