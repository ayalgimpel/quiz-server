const db = require("../Repository/db.quizesSubjectsRepository");

class QuizesSubjectsController {


  async GetAllSubjects() {
    return await  db.GetAllSubjects();
  }
}
module.exports = new QuizesSubjectsController();

