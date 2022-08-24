const db = require("../Repository/db.institutesRepository");

class InstitutesController {
  // Get Questions
  getAllInstitutes() {
    return db.getAllinstitutes();
  }

  // Add question to the list
//   addQuestion(question) {
//     if (!question.Title) throw "question has no title";
//     return db.addQuestion(question);
//   }
}
module.exports = new InstitutesController();
