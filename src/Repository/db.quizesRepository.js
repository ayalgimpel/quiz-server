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
   createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
       var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
       return v.toString(16);
    });
 }

  async addQuiz(quiz) {
    let data = JSON.parse(await readFile(jsonFileName));
    const newId = this.createUUID();
    const newQuiz = { Id: newId, Name: quiz.Name };
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