const db = require("../Repository/db.answersRepository");

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
