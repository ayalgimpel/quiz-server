const studentAnswersRepository = require("../Repository/db.StudentAnswersRepository");

class StudentAnswersController {

    async CreateStudentAnswer({ Quiz_Id, Student_Id,Answer_Id, CreatedDate }) {
        return studentAnswersRepository.CreateStudentAnswer({ Quiz_Id, Student_Id,Answer_Id, CreatedDate });
    }

}
module.exports = new StudentAnswersController();

