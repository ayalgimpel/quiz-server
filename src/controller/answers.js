const db = require("../Repository/db.answersRepository");

class AnswersController {

  GetQuestionAnswer(questionId) {
    return db.GetAllAnswers(questionId);
  }
  AddAnswer(answer) {
    return db.AddAnswer(answer);
  }
  DeleteAnswer(answerId){
    return db.DeleteAnswer(answerId);
  }

  ChangeAnswersState(questionId, answerId) {
    return db.SetCorrectAnswer(questionId, answerId)
  }
 

}
module.exports = new AnswersController();
