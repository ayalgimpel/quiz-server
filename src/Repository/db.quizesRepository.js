const fs = require("fs");
const util = require("util");
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const jsonFileName = "./src/data/QuizesJson.json";
const questionsRepository = require("../Repository/db.questionsRepository");
const _ = require("lodash");

class DBQuizesRepository {

  async getAllQuizes() {
    const data = JSON.parse(await readFile(jsonFileName));
    return data.Quiz;
  }

  createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  async addQuiz(quiz) {
    let data = JSON.parse(await readFile(jsonFileName));
    const newId = this.createUUID();
    const newQuiz = { Id: newId, Name: quiz.Name };
    data.Quiz.push(newQuiz);
    await writeFile(jsonFileName, JSON.stringify(data));
    return newQuiz;
  }
  async GetQuizById(id) {
    console.log(id)
    const data = JSON.parse(await readFile(jsonFileName));

    return data.Quiz.find(quiz => quiz.Id === id);
  }

  async GetQuizByQuizCode(quizCode) {
    let quizes = await this.getAllQuizes();
    const quize = quizes.find(q => q.Quiz_Code === quizCode)
    return this.GetQuizById(quize.Id);
  }

  Post(quiz) {

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


}
module.exports = new DBQuizesRepository();