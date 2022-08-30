const fs = require("fs");
const util = require("util");
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const jsonFileName = "./src/data/QuestionJson.json";

class DBQuestionsRepository {

  async getAllQuestions() {
    const data = JSON.parse(await readFile(jsonFileName));
    return data;
  }

  async addQuestion(question) {
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
  // async GetQustionById(id) {
  //let questions = await this.getAllQuestions();
  //const question = questions.find(q => q.id === id)
  // return this.GetQustionById(question.Id);

  // }
  Post(question) {

  }
  Put(question) {

  }
  Delete(id) {


  }
  async GetByQuizId(quizId) {
    const { Questions } = JSON.parse(await readFile(jsonFileName));
    const filterd =  Questions.filter(question => question.Quiz_Id === quizId);
    return filterd
  }
}

module.exports = new DBQuestionsRepository();
