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
    const question = questions.find(question => question.Id === id);
    return question;
  }

  async Delete(questionId) {
    let data = JSON.parse(await readFile(jsonFileName));
    const newQestionArr = data.Questions.filter(q => q.Id !== questionId);
    data.Questions = newQestionArr;
    
    try {
      await writeFile(jsonFileName, JSON.stringify(data));
      await this.DeleteQuestionIdRefrence(questionId);
      return { TransactionResult: true, deletedQuestionId: questionId };
    }
    catch (err) {
      return { TransactionResult: false, error: err }
    }
  }
  async DeleteQuestionIdRefrence(questionId) {
    let quizData = JSON.parse(await readFile(jsonFileNameQuiz));
    let questionRef;
    quizData.Quiz.forEach(element => {
      questionRef = element.Questions;
      _.remove(questionRef, id => id === questionId)
    });
    await writeFile(jsonFileNameQuiz, JSON.stringify(quizData));
  }
 async AddAnswerRefrence(answerId,questionId){
    let data = JSON.parse(await readFile(jsonFileName));
    const question = data.Questions.find(q => q.Id === questionId);
    question.Answers.push(answerId);
    await writeFile(jsonFileName, JSON.stringify(data));
  }

  async GetByQuizId(quizId) {
    const quizData = JSON.parse(await readFile(jsonFileNameQuiz));
    const quize = quizData.Quiz.filter(q => q.Id === quizId);
    const filteredQuestions = [];
    for (const id of quize[0].Questions) {
      let question = await this.GetQustionById(id);
      filteredQuestions.push(question);
    }
    return filteredQuestions;
  }
}

module.exports = new DBQuestionsRepository();
