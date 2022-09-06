const answersRepository = require("../Repository/db.answersRepository");
const questionsRepository = require("../Repository/db.questionsRepository");

class QuestionsController {
  // Get Questions
  GetAllQuestions() {
    return questionsRepository.GetAllQuestions();
  }

  // Add question to the list
  AddQuestion(question) {
    if (!question.Title) throw "question has no title";
    return questionsRepository.AddQuestion(question);
  }
  GetQustionById(id){
    return questionsRepository.GetQustionById(id);
  }

  GetAnswersByQuestionId(questionId){
    return answersRepository.GetAllAnswers(questionId);
  }
}

module.exports = new QuestionsController();
