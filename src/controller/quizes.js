const quizesRepository = require("../Repository/db.quizesRepository");
const questionsRepository = require("../Repository/db.questionsRepository");

class QuizesController {

  GetAllQuizes() {
    return quizesRepository.GetAllQuizes();
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
  AddQuiz(quiz) {
    return quizesRepository.AddNewQuiz(quiz);
  }
  GetQuestionsByQuizId(quizId) {
    return questionsRepository.GetByQuizId(quizId);
  }
  EditQuiz(quizId, payload) {
    return quizesRepository.EditQuiz(quizId, payload);
  }
  AddQuestionToQuiz(questionId, quizId) {
    return quizesRepository.AddQuestionToQuiz(questionId, quizId)
  }
  RemoveQuestionFromQuiz(questionId, quizId) {
    return quizesRepository.RemoveQuestionFromQuiz(questionId, quizId);
  }
  GetByQuery({ institute, quizSubject }) {
    return quizesRepository.GetByQuery({ institute, quizSubject });
  }
  ChangeActivity(quizId){
    return quizesRepository.ChangeActivity(quizId)
  }

}

module.exports = new QuizesController();
