const quizesRepository = require("../Repository/db.quizesRepository");
const studentQuizesRepository = require("../Repository/db.studentQuizesRepository");
const studentsRepository = require("../Repository/db.studentsRepository");
const answersRepository = require("../Repository/db.answersRepository");
const studentAnswersRepository = require("../Repository/db.studentAnswersRepository");





class ReportController {

    async getReport({ quizId, from, to }) {
        const quiz = await quizesRepository.GetQuizById(quizId);
        if (!quiz)
            throw new Error(`Not found 'quiz' with id [${quiz}]`);

        const studentQuizes = await studentQuizesRepository.getByQuery({ Quiz_Id: quizId, fromFinishedDate: from, toFinishedDate: to })
      


       


    }

}

module.exports = new ReportController();