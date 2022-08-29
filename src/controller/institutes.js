const db = require("../Repository/db.institutesRepository");

class InstitutesController {
  
  async GetAllInstitutes() {
    return await db.GetAllInstitutes();
  }

}
module.exports = new InstitutesController();
