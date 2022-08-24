const db = require("../Repository/db.studentsRepository.js");

class StudentsController {
  // Get Questions
  getAllStudents() {
    return db.getAllStudents();
  }

  // Add question to the list
//   addQuestion(question) {
//     if (!question.Title) throw "question has no title";
//     return db.addQuestion(question);
//   }
}
module.exports = new StudentsController();
