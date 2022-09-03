const studentQuizesRepository = require("../Repository/db.studentQuizesRepository");

class QuizesSubjectsController {


    async CreateStudentQuiz({ Quiz_Id, Student_Id, CreatedDate }) {


        // validate Quiz_Id, Student_Id is exist if not throw error!

        return studentQuizesRepository.CreateStudentQuiz({ Quiz_Id, Student_Id, CreatedDate });
    }
}
module.exports = new QuizesSubjectsController();

