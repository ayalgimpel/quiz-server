const fs = require("fs");
const util = require("util");
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const jsonFileName = "./src/data/QuizesJson.json";

class DBQuizesRepository {

  async getAllQuizes() {
    const data = JSON.parse(await readFile(jsonFileName));
    return data;
  }

  async addQuiz(quiz) {
    let data = JSON.parse(await readFile(jsonFileName));
    const biggestId = Math.max.apply(
      Math,
      data.map((quiz) => quiz.Id)
    );
    const newQuiz = { Id: biggestId + 1, Name: quiz.Name };
    data.push(newQuiz);
    await writeFile(jsonFileName, JSON.stringify(data));
    return newQuiz;
  }
  GetQuizById(id) {

  }
  Post(quiz) {

  }
  Put(quiz) {

  }
  Delete(id) {


  }
}
module.exports = new DBQuizesRepository();