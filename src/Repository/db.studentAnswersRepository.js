const fs = require("fs");
const util = require("util");
const { uuid } = require('uuidv4');
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const jsonFileName = "./src/data/StudentAnswersJson.json";
class DBStudentAnswersRepository {

    async CreateStudentAnswer(payload) {
        let data = JSON.parse(await readFile(jsonFileName));
        payload.id = uuid();
        data.StudentAnswers.push(payload);

        try {
            await writeFile(jsonFileName, JSON.stringify(data));
            return { TransactionResult: true, createStudentAnswer: payload };
        }
        catch (err) {
            return { TransactionResult: false, error: err }
        }
    }


  
   
   
  }
  module.exports = new DBStudentAnswersRepository();