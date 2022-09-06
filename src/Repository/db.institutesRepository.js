const fs = require("fs");
const util = require("util");
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const jsonFileName = "./src/data/InstituteJson.json";
class DBInstituteRepository {

    async GetAllInstitutes() {
      const data = JSON.parse(await readFile(jsonFileName));
      return data.Institute;
    }
    async GetInstituteById(id) {
      const data = JSON.parse(await readFile(jsonFileName));
      return data.Institute.filter(insti => insti.Id === id);
    }
   
  }
  module.exports = new DBInstituteRepository();