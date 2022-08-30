const fs = require("fs");
const util = require("util");
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const jsonFileName = "./src/data/AnswersJson.json";

class DBAnswersRepository {



    async getAllAnswers(questionId) {
        const { Answers } = JSON.parse(await readFile(jsonFileName));
        const filterd = Answers.filter(answer => answer.Qustion_Id == questionId);
        return filterd
    }
}
module.exports = new DBAnswersRepository();