const db = require("../DAL/db.quizesSubjectsRepository.js");

class QuizesSubjectsController {
  // Get Questions
  getAllSubjects() {
    return db.getAllSubjects();
  }

  // Add question to the list
//   addQuestion(question) {
//     if (!question.Title) throw "question has no title";
//     return db.addQuestion(question);
//   }
}
module.exports = new QuizesSubjectsController();

