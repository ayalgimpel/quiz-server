const studentAnswersRepository = require("../Repository/db.StudentAnswersRepository");

class StudentAnswersController {

    async CreateStudentAnswer({ Quiz_Id, Student_Id,Answer_Id, CreatedDate }) {


        // validate Quiz_Id, Student_Id, Answer_Id is exist if not throw error!

        return studentAnswersRepository.CreateStudentAnswer({ Quiz_Id, Student_Id,Answer_Id, CreatedDate });
    }

}
module.exports = new StudentAnswersController();

