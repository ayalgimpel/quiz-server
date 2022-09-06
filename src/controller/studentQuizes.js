const studentQuizesRepository = require("../Repository/db.studentQuizesRepository");

class QuizesSubjectsController {


    async CreateStudentQuiz({ Quiz_Id, Student_Id, CreatedDate }) {
        return studentQuizesRepository.CreateStudentQuiz({ Quiz_Id, Student_Id, CreatedDate });
    }
}
module.exports = new QuizesSubjectsController();

