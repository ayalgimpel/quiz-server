const fs = require("fs");
const util = require("util");
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const { uuid } = require('uuidv4')
const jsonFileName = "./src/data/StudentsJson.json";

class DBStudentsRepository {

  async getAllStudents() {
    const data = JSON.parse(await readFile(jsonFileName));
    return data;
  }


  async createStudent(student) {
    let data = JSON.parse(await readFile(jsonFileName));
    student.id = uuid();
    data.Student.push(student);
    await writeFile(jsonFileName, JSON.stringify(data));
    return student;
  }

  async addStudent(student) {
    let data = JSON.parse(await readFile(jsonFileName));
    const biggestId = Math.max.apply(
      Math,
      data.map((student) => student.Id)
    );
    const newStudent = { Id: biggestId + 1, Title: student.Title };
    data.push(newStudent);
    await writeFile(jsonFileName, JSON.stringify(data));
    return newStudent;
  }
  async GetStudentById(id) {
    const data = JSON.parse(await readFile(jsonFileName));
    return data.Quiz.filter(quiz => quiz.Id === id);
  }
  Post(student) {

  }
  Put(Student) {

  }
  Delete(id) {


  }
}

module.exports = new DBStudentsRepository();
