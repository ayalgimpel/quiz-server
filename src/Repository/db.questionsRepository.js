const fs = require("fs");
const util = require("util");
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const jsonFileName = "./src/data/QuestionJson.json";
const jsonFileNameQuiz = "./src/data/QuizesJson.json";
const _ = require("lodash");



class DBQuestionsRepository {

  async GetAllQuestions() {
    const data = JSON.parse(await readFile(jsonFileName));
    return data.Questions;
  }

  async AddQuestion(question) {
    let data = JSON.parse(await readFile(jsonFileName));
    const biggestId = Math.max.apply(
      Math,
      data.map((question) => question.Id)
    );
    const newQuestion = { Id: biggestId + 1, Title: question.Title };
    data.push(newQuestion);
    await writeFile(jsonFileName, JSON.stringify(data));
    return newQuestion;
  }
 async GetQustionById(id) {
  let questions = await this.GetAllQuestions();
   const question = questions.find(q => q.Id === id);
   return question;

  }
  async DeleteAnswerRef(questionId,answerId){
    let questions = await this.GetAllQuestions();
    let question = questions.filter(item=>item.Id===questionId);
    _.remove(question.Answers, id=> id === answerId);
    await writeFile(jsonFileName, JSON.stringify(questions));
  }
  Post(question) {

  }
  Put(question) {

  }
  Delete(id) {


  }
  
  async GetByQuizId(quizId) {
    const quizData = JSON.parse(await readFile(jsonFileNameQuiz));
    const quize = quizData.Quiz.find(q => q.Id === quizId);
    const filteredQuestions = [];
    for (const id of quize.Questions) {
      let question = await this.GetQustionById(id);
      filteredQuestions.push(question);
    }
    return filteredQuestions;
  }
}

module.exports = new DBQuestionsRepository();
