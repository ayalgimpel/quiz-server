const db = require("../DAL/db.answersRepository.js");

class AnswersController {
  // Get Questions
  getAllAnswers() {
    return db.getAllanswers();
  }

  // Add question to the list
//   addQuestion(question) {
//     if (!question.Title) throw "question has no title";
//     return db.addQuestion(question);
//   }
}
module.exports = new AnswersController();