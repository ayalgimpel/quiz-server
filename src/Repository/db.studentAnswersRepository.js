const fs = require("fs");
const util = require("util");
const { uuid } = require('uuidv4');
const questions = require("../controller/questions");
const studentAnswers = require("../controller/studentAnswers");
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const jsonFileName = "./src/data/StudentAnswersJson.json";
class DBStudentAnswersRepository {

    async CreateOrUpdateStudentAnswer(payload) {

        try {
            let data = JSON.parse(await readFile(jsonFileName));
            const foundStudentAnswer = data.StudentAnswers.find(studentAnswer => studentAnswer.Qustion_Id === payload.Qustion_Id
                && studentAnswer.StudentQuizes_Id === payload.StudentQuizes_Id)

            if (!foundStudentAnswer) {
                // create
                payload.Id = uuid();
                data.StudentAnswers.push(payload);
            }
            else {
                // update
                payload = Object.assign(foundStudentAnswer, payload);
            }


            await writeFile(jsonFileName, JSON.stringify(data));
            return { TransactionResult: true, createdStudentAnswer: payload };
        }
        catch (err) {
            console.log(err)
            return { TransactionResult: false, error: err }
        }
    }
    async GetStudnetAnswers({ StudentQuiz_Id }) {
        const data = JSON.parse(await readFile(jsonFileName));
        return data.StudentAnswers.filter(StudentAnswer => StudentAnswer.StudentQuizes_Id === StudentQuiz_Id);
    }


}
module.exports = new DBStudentAnswersRepository();