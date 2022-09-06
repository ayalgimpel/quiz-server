const fs = require("fs");
const util = require("util");
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const jsonFileName = "./src/data/AnswersJson.json";
const questionRepo = require("../Repository/db.questionsRepository");

class DBAnswersRepository {

    async GetAllAnswers(questionId) {
        const data  = JSON.parse(await readFile(jsonFileName));
        let filterd = data.Answers.filter(answer => answer.Qustion_Id === questionId);
        return filterd;
    }
    async AddAnswerRefrenceToQuestion(questionId,answerId){
       return questionRepo.AddAnswerRefrence(answerId,questionId)
    }
    async AddAnswer(answer){
        await this.AddAnswerRefrenceToQuestion(answer.Qustion_Id,answer.Id)
        const data  = JSON.parse(await readFile(jsonFileName));
        data.Answers.push(answer);
        await writeFile(jsonFileName, JSON.stringify(data));
    }
    async MarkAsCorrectAnswer(answer){
        let data  = JSON.parse(await readFile(jsonFileName));
        const answerItem = data.Answers.find(item => item.Id === answer.Id);
        answer.IsCorrect = true;
        await writeFile(jsonFileName, JSON.stringify(data));

    }
    async ChangeAnswersState(questionId){
        let data  = JSON.parse(await readFile(jsonFileName));
        const answerItems = data.Answers.filter(item => item.Qustion_Id === questionId);
        answerItems.forEach(element => {
            element.IsCorrect === false;
        });
        await writeFile(jsonFileName, JSON.stringify(data));
    }
    async SetCorrectAnswer(answerId){
        let data  = JSON.parse(await readFile(jsonFileName));
        const answer = data.Answers.filter(item => item.Id === answerId);
        answer.IsCorrect===true;
        await writeFile(jsonFileName, JSON.stringify(data));
    }
    
}
module.exports = new DBAnswersRepository();