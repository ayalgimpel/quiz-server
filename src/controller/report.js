const quizesRepository = require("../Repository/db.quizesRepository");
const studentQuizesRepository = require("../Repository/db.studentQuizesRepository");
const studentsRepository = require("../Repository/db.studentsRepository");
const answersRepository = require("../Repository/db.answersRepository");
const studentAnswersRepository = require("../Repository/db.studentAnswersRepository");
const repoerService = require('../services/report.service');


class ReportController {

    async getReport({ quizId, from, to }) {
        const quiz = await quizesRepository.GetQuizById(quizId);
        if (!quiz)
            throw new Error(`Not found 'quiz' with id [${quiz}]`);

        const studentQuizes = await studentQuizesRepository.getByQuery({ Quiz_Id: quizId, fromFinishedDate: from, toFinishedDate: to })

        let reports = []
        await Promise.all(studentQuizes.map(async (studentQuiz) => {
            const student = await studentsRepository.GetStudentById(studentQuiz.Student_Id);
            const report = await repoerService.generateReport({ quiz, student, studentQuiz });
            reports.push(report)
        }))

        return reports;
    }

}

module.exports = new ReportController();