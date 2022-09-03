const quizesRepository = require("../Repository/db.quizesRepository");
const questionsRepository = require("../Repository/db.questionsRepository");

class QuizesController {

  getAllQuizes() {
    return quizesRepository.getAllQuizes();
  }
  async DeleteQuiz(quizID) {
    return await quizesRepository.Delete(quizID);
  }
  GetQuizById(id) {
    return quizesRepository.GetQuizById(id);
  }
  GetQuizByQuizCode(quizeCode) {
    return quizesRepository.GetQuizByQuizCode(quizeCode);
  }
  AddQuiz() {
    return quizesRepository.addQuiz();
  }
  GetQuestionsByQuizId(quizId) {
    return questionsRepository.GetByQuizId(quizId);
  }
  AddQuestionToQuiz(questionId,quizId){
    return quizesRepository.AddQuestionToQuiz(questionId,quizId)
  }
  RemoveQuestionFromQuiz(questionId,quizId){
    return quizesRepository.RemoveQuestionFromQuiz(questionId,quizId);
  }


}

module.exports = new QuizesController();
