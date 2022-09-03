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



}
module.exports = new DBstudentQuizesRepository();