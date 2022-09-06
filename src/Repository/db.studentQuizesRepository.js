const fs = require("fs");
const util = require("util");
const { uuid } = require('uuidv4');
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const jsonFileName = "./src/data/StudentQuizJson.json";
class DBstudentQuizesRepository {

    async CreateStudentQuiz(payload) {
        let data = JSON.parse(await readFile(jsonFileName));
        payload.Id = uuid();
        data.StudentQuizes.push(payload);

        try {
            await writeFile(jsonFileName, JSON.stringify(data));
            return { TransactionResult: true, createdStudentQuiz: payload };
        }
        catch (err) {
            return { TransactionResult: false, error: err }
        }
    }

    async update(id, payload) {
        try {
            let data = JSON.parse(await readFile(jsonFileName));
            let foundStudentQuiz = data.StudentQuizes.find(studentQuiz => studentQuiz.Id === id);
            if (!foundStudentQuiz)
                return;

            payload = Object.assign(foundStudentQuiz, payload);
            await writeFile(jsonFileName, JSON.stringify(data));
            return { TransactionResult: true, createdStudentAnswer: payload };
        } catch (error) {
            console.log(error)
            return { TransactionResult: false, error: error }
        }
    }

    async findOne({ StudentQuiz_Id }) {
        console.log("StudentQuiz_Id");
        console.log(StudentQuiz_Id);
        let data = JSON.parse(await readFile(jsonFileName));
        const found = data.StudentQuizes.find(StudentQuiz => StudentQuiz.Id === StudentQuiz_Id);
        return found;
    }

    async getByQuery({ Quiz_Id, fromFinishedDate, toFinishedDate }) {
        let data = JSON.parse(await readFile(jsonFileName));
        const filterdStudentQuizes = data.StudentQuizes.filter(quiz => quiz.finished && quiz.Quiz_Id === Quiz_Id && quiz.finishedDate >= fromFinishedDate && quiz.finishedDate <= toFinishedDate);
        return filterdStudentQuizes;
    }

}
module.exports = new DBstudentQuizesRepository();