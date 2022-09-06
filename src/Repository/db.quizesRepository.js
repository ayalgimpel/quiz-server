const fs = require("fs");
const util = require("util");
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const jsonFileName = "./src/data/QuizesJson.json";
const questionsRepository = require("../Repository/db.questionsRepository");
const _ = require("lodash");

class DBQuizesRepository {

  async GetAllQuizes() {
    const data = JSON.parse(await readFile(jsonFileName));
    return data.Quiz;
  }


  async AddNewQuiz(quiz) {
    let data = JSON.parse(await readFile(jsonFileName));
    data.Quiz.push(quiz)
    await writeFile(jsonFileName, JSON.stringify(data));
  }
  async GetQuizById(id) {
    const data = JSON.parse(await readFile(jsonFileName));
    return data.Quiz.find(quiz => quiz.Id === id);
  }
  async EditQuiz(quizId, payload) {
    console.log(payload.Passing_Grade)
    const data = JSON.parse(await readFile(jsonFileName));
    const quizToEdit = data.Quiz.find(quiz => quiz.Id === quizId);
    Object.assign(quizToEdit, payload);
    await writeFile(jsonFileName, JSON.stringify(data));
  }

  async GetQuizByQuizCode(quizCode) {
    let quizes = await this.GetAllQuizes();
    const quize = quizes.find(q => q.Quiz_Code === quizCode)
    if (!quize)
      throw new Error(`Not found 'quiz' with quiz code [${quizCode}]`);
      
    return this.GetQuizById(quize.Id);
  }

  async DeleteQuizIdRefrence(quizId) {
    let data = JSON.parse(await readFile(questionJasonFileName));
    let quizRef;
    data.Questions.forEach(element => {
      quizRef = element.Quizes_Id;
      _.remove(quizRef, id => id === quizId)
    });
    await writeFile(questionJasonFileName, JSON.stringify(data));
  }
  Put(quiz) {

  }
  async Delete(quizID) {
    let data = JSON.parse(await readFile(jsonFileName));
    const newQuizArr = data.Quiz.filter(q => q.Id !== quizID);
    data.Quiz = newQuizArr;

    try {
      await writeFile(jsonFileName, JSON.stringify(data));
      return { TransactionResult: true, deletedQuizID: quizID };
    }
    catch (err) {
      return { TransactionResult: false, error: err }
    }

  }
  async AddQuestionToQuiz(questionId, quizId) {

    let data = JSON.parse(await readFile(jsonFileName));
    let question = await questionsRepository.GetQustionById(questionId);
    if (!question) {
      throw new Error("object not found")
    }

    const foundQuiz = data.Quiz.find(q => q.Id === quizId);
    if (!foundQuiz) {
      throw new Error("object not found")
    }

    const quizQuestions = foundQuiz.Questions;
    if (quizQuestions.indexOf(question.Id) >= 0) {
      throw new Error("Question Is Allready Exist...")
    }



    quizQuestions.push(question.Id);
    foundQuiz.Questions = _.sortBy(quizQuestions, quizQuestion => quizQuestion);
    try {
      await writeFile(jsonFileName, JSON.stringify(data));
      return { TransactionResult: true, addedQuestionID: questionId };
    }
    catch (err) {
      return { TransactionResult: false, error: err }
    }


  }
  async RemoveQuestionFromQuiz(questionId, quizId) {

    let data = JSON.parse(await readFile(jsonFileName));
    let question = await questionsRepository.GetQustionById(questionId);
    if (!question) {
      throw new Error("object not found")
    }

    const foundQuiz = data.Quiz.find(q => q.Id === quizId);
    if (!foundQuiz) {
      throw new Error("object not found")
    }

    _.remove(foundQuiz.Questions, id => id === questionId)

    try {
      await writeFile(jsonFileName, JSON.stringify(data));
      return { TransactionResult: true, removedQuestionID: questionId };
    }
    catch (err) {
      return { TransactionResult: false, error: err }
    }
  }

  async GetByQuery({ institute, quizSubject }) {
    let data = JSON.parse(await readFile(jsonFileName));
    const filterdQuizes = data.Quiz.filter(quiz => quiz.Institue_Name === institute && quiz.Quiz_Subject === quizSubject);
    return filterdQuizes;
  }



}
module.exports = new DBQuizesRepository();