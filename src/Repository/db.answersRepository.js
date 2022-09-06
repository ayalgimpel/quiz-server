const fs = require("fs");
const util = require("util");
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const jsonFileName = "./src/data/AnswersJson.json";
const questionRepo = require("../Repository/db.questionsRepository");
const _ = require("lodash");


class DBAnswersRepository {

    async GetAllAnswers(questionId) {
        const data = JSON.parse(await readFile(jsonFileName));
        let filterd = data.Answers.filter(answer => answer.Qustion_Id === questionId);
        return filterd;
    }
    async AddAnswerRefrenceToQuestion(questionId, answerId) {
        return questionRepo.AddAnswerRefrence(answerId, questionId)
    }
    async AddAnswer(answer) {
        await this.AddAnswerRefrenceToQuestion(answer.Qustion_Id, answer.Id)
        const data = JSON.parse(await readFile(jsonFileName));
        data.Answers.push(answer);
        await writeFile(jsonFileName, JSON.stringify(data));
    }
    async SetCorrectAnswer(questionId, answerId) {
        const question = await questionRepo.GetQustionById(questionId);
        if (question.SingleChoice) {
            let data = JSON.parse(await readFile(jsonFileName));
            let answerItems = data.Answers.filter(item => item.Qustion_Id === questionId);
            answerItems.forEach(element => {
                element.IsCorrect = false;
            });
            const answer = answerItems.find(item => item.Id === answerId);
            answer.IsCorrect = true;
            await writeFile(jsonFileName, JSON.stringify(data));
        }
        else {
            let data = JSON.parse(await readFile(jsonFileName));
            const answer = data.Answers.find(item => item.Id === answerId);
            answer.IsCorrect = true;
            await writeFile(jsonFileName, JSON.stringify(data));
        }
    }
    async DeleteAnswer(answerId) {
        let data = JSON.parse(await readFile(jsonFileName));
        const answer = data.Answers.find(item => item.Id === answerId)
        const newAnswersArr = data.Answers.filter(a => a.Id !== answerId)
        data.Answers = newAnswersArr;
        await writeFile(jsonFileName, JSON.stringify(data));
        await this.DeletAnswerIdReference(answer.Qustion_Id,answerId)

    }
    async DeletAnswerIdReference(answerId) {
        let data = JSON.parse(await readFile(jsonFileName));
        const answer = data.find(item => item.Id === answerId);
        await DeleteAnswerRef(answer.Qustion_Id,answer.Id);
    }

}
module.exports = new DBAnswersRepository();