const fs = require("fs");
const util = require("util");
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const jsonFileName = "./src/data/QuizesJson.json";

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


}
module.exports = new DBQuizesRepository();