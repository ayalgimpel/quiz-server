const db = require("../DAL/db.quizesRepository.js");

class QuizesController {
  // Get Questions
  getAllQuestions() {
    return db.getAllquizes();
  }

  // Add question to the list
//   addQuestion(question) {
//     if (!question.Title) throw "question has no title";
//     return db.addQuestion(question);
//   }
}

module.exports = new QuizesController();