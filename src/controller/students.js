const studentsRepository = require("../Repository/db.studentsRepository.js");

class StudentsController {
  // Get Questions
  getAllStudents() {
    return studentsRepository.getAllStudents();
  }

  createStudent(payload) {
    return studentsRepository.createStudent(payload);
  }
}
module.exports = new StudentsController();
