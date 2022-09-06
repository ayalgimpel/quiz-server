const studentAnswersRepository = require("../Repository/db.StudentAnswersRepository");
const studentQuizesRepository = require("../Repository/db.studentQuizesRepository");

class StudentAnswersController {

    async CreateOrUpdateStudentAnswer({ StudentQuizes_Id, Qustion_Id, Answer_Id, CreatedDate }) {


        // validate Quiz_Id, Student_Id, Answer_Id is exist if not throw error!

        return studentAnswersRepository.CreateOrUpdateStudentAnswer({ StudentQuizes_Id, Qustion_Id, Answer_Id, CreatedDate });
    }


    async GetStudnetAnswers({ StudentQuiz_Id }) {
        const studentQuiz = await studentQuizesRepository.findOne({ StudentQuiz_Id });
        if (!studentQuiz)
            throw new Error(`Not found StudentQuiz with id '${StudentQuiz_Id}`);

        return studentAnswersRepository.GetStudnetAnswers({ StudentQuiz_Id: studentQuiz.Id });
    }


}
module.exports = new StudentAnswersController();

