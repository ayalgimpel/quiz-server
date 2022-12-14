const fs = require("fs");
const util = require("util");
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const { uuid } = require('uuidv4')
const jsonFileName = "./src/data/StudentsJson.json";

class DBStudentsRepository {

  async GetAllStudents() {
    const data = JSON.parse(await readFile(jsonFileName));
    return data;
  }


  async CreateStudent(student) {
    let data = JSON.parse(await readFile(jsonFileName));
    student.id = uuid();
    data.Student.push(student);
    await writeFile(jsonFileName, JSON.stringify(data));
    return student;
  }

  async AddStudent(student) {
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
    return data.Student.find(student => student.Id === id || student.id === id);
  }
  Post(student) {

  }
  Put(Student) {

  }
  Delete(id) {


  }

  async findOne({ studentId }) {
    const data = JSON.parse(await readFile(jsonFileName));
    return data.Student.find(student => student.id === studentId || student.id === studentId);
  }


  async getStudents(studentIds) {
    const { Student } = await this.GetAllStudents();
    const allStudents = Student;
    return allStudents.filter(student => studentIds.indexOf(student.Id || student.id) > -1);
  }
}

module.exports = new DBStudentsRepository();
