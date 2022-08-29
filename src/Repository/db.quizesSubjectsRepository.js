const fs = require("fs");
const util = require("util");
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const jsonFileName = "./src/data/QuizSubjectJson.json";
class DBInstituteRepository {

    async GetAllSubjects() {
      const data = JSON.parse(await readFile(jsonFileName));
      return data.QuizSubject;
    }

  
    async GetSubjectById(id) {
      const data = JSON.parse(await readFile(jsonFileName));
      return data.QuizSubject.filter(subj => subj.Id === id);
    }
   
  }
  module.exports = new DBInstituteRepository();