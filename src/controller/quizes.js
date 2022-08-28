const db = require("../Repository/db.quizesRepository");

class QuizesController {
  // Get Questions
  getAllQuizes() {
    return db.getAllQuizes();
  }

  // Add question to the list
//   addQuestion(question) {
//     if (!question.Title) throw "question has no title";
//     return db.addQuestion(question);
//   }
}

module.exports = new QuizesController();
