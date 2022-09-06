const answersRepository = require("../Repository/db.answersRepository");
const questionsRepository = require("../Repository/db.questionsRepository");

class QuestionsController {
  GetAllQuestions() {
    return questionsRepository.GetAllQuestions();
  }

  AddQuestion(question) {
    if (!question.Title) throw "question has no title";
    return questionsRepository.AddQuestion(question);
  }
  GetQustionById(id){
    return questionsRepository.GetQustionById(id);
  }
  DeleteQuestion(questionId){
    return questionsRepository.Delete(questionId);
  }
  GetAnswersByQuestionId(questionId){
    return answersRepository.GetAllAnswers(questionId);
  }
}

module.exports = new QuestionsController();
