const answersRepository = require("../Repository/db.answersRepository");
const questionsRepository = require("../Repository/db.questionsRepository");

class QuestionsController {
  // Get Questions
  getAllQuestions() {
    return questionsRepository.getAllQuestions();
  }

  // Add question to the list
  addQuestion(question) {
    if (!question.Title) throw "question has no title";
    return questionsRepository.addQuestion(question);
  }
  GetQustionById(id){
    return questionsRepository.GetQustionById(id);
  }

  GetAnswersByQuestionId(questionId){
    return answersRepository.getAllAnswers(questionId);
  }
}

module.exports = new QuestionsController();
