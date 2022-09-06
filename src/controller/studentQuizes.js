const studentQuizesRepository = require("../Repository/db.studentQuizesRepository");
const quizesRepository = require("../Repository/db.quizesRepository");
const studentsRepository = require("../Repository/db.studentsRepository");
const answersRepository = require("../Repository/db.answersRepository");
const studentAnswersRepository = require("../Repository/db.studentAnswersRepository");

const _ = require('lodash');

class QuizesSubjectsController {

    async CreateStudentQuiz({ Quiz_Id, Student_Id, CreatedDate }) {
        return studentQuizesRepository.CreateStudentQuiz({ Quiz_Id, Student_Id, CreatedDate });
    }

    async update(id, payload) {
        const studentQuiz = await studentQuizesRepository.findOne({ StudentQuiz_Id: id });
        if (!studentQuiz)
            throw new Error(`Not found 'studentQuiz' with id [${id}]`);

        return studentQuizesRepository.update(studentQuiz.Id, payload);
    }

    async GetQuizResult(studentQuizId) {
        const studentQuiz = await studentQuizesRepository.findOne({ StudentQuiz_Id: studentQuizId });
        if (!studentQuiz)
            throw new Error(`Not found 'studentQuiz' with id [${studentQuizId}]`);

        const student = await studentsRepository.findOne({ studentId: studentQuiz.Student_Id });
        if (!student)
            throw new Error(`Not found 'student' with id [${studentQuiz.Student_Id}]`);

        const quiz = await quizesRepository.GetQuizById(studentQuiz.Quiz_Id);
        if (!quiz)
            throw new Error(`Not found 'quiz' with id [${studentQuiz.Quiz_Id}]`);


        let answersByquestionId = {};
        const questions = quiz.Questions;
        await Promise.all(questions.map(async (questionId) => {
            const answers = await answersRepository.GetAllAnswers(questionId);
            answersByquestionId[questionId] = answers;
        }))

        const studentAnswers = await studentAnswersRepository.GetStudnetAnswers({ StudentQuiz_Id: studentQuizId });

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
            student
        }

        return result;
    }
}
module.exports = new QuizesSubjectsController();

