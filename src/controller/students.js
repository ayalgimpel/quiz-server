const studentsRepository = require("../Repository/db.studentsRepository.js");

class StudentsController {
  // Get Questions
  GetAllStudents() {
    return studentsRepository.GetAllStudents();
  }

  CreateStudent(payload) {
    return studentsRepository.CreateStudent(payload);
  }
}
module.exports = new StudentsController();
