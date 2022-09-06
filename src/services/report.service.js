const answersRepository = require("../Repository/db.answersRepository");
const studentAnswersRepository = require("../Repository/db.studentAnswersRepository");
const _ = require('lodash');

class RepoerService {

    async generateReport({ quiz, student, studentQuiz }) {

        let answersByquestionId = {};
        const questions = quiz.Questions;
        await Promise.all(questions.map(async (questionId) => {
            const answers = await answersRepository.GetAllAnswers(questionId);
            answersByquestionId[questionId] = answers;
        }))

        const studentAnswers = await studentAnswersRepository.GetStudnetAnswers({ StudentQuiz_Id: studentQuiz.Id });

        const totalQuestions = questions.length;
        let totalStudentAnswersCount = 0;

        _.forIn(answersByquestionId, (answers, key) => {
            const foundCorrentAnswer = answers.find(answer => answer.IsCorrect);
            const studentCorrentAnswer = studentAnswers.find(studentAnswer => studentAnswer.Answer_Id === foundCorrentAnswer.Id);
            if (studentCorrentAnswer)
                totalStudentAnswersCount++;
        });

        let pointsToQuestion = 100 / totalQuestions;
        const grade = Math.round(pointsToQuestion * totalStudentAnswersCount)
        const result = {
            quizName: quiz.Name,
            grade,
            passed: grade > quiz.Passing_Grade,
            totalQuestions,
            correntStudentAnswer: totalStudentAnswersCount,
            passingGrade: quiz.Passing_Grade,
            student,
            submittedDate: studentQuiz.finishedDate
        }

        return result;
    }

}

module.exports = new RepoerService();
