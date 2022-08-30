const db = require("../Repository/db.quizesRepository");

class QuizesController {

  getAllQuizes() {
    return db.getAllQuizes();
  }
  async DeleteQuiz(quizID){
    return await db.Delete(quizID);
  }
  GetQuizById(Id){
    return db.GetQuizById(Id);
  }
  AddQuiz(){
    return db.addQuiz();
  }


}

module.exports = new QuizesController();
