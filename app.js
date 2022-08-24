const express = require("express");
const app = express();

const questionsRouter = require("./src/routes/questionsRoutes");
const quizesRouter = require("./src/routes/quizesRoutes");
const answersRouter = require("./src/routes/answersRoutes");
const quizesSubjectsRouter = require("./src/routes/quizesSubjectsRoutes");
const studentsRouter = require("./src/routes/studentsRoutes");
const instituteRouter = require("./src/routes/insituteRoutes");

const cors = require("cors");
const bodyParser = require("body-parser");
const Urls = require("./src/settings/staticUrls");

app.use(cors());


app.use(bodyParser.json());

app.use("/api/questions", questionsRouter);
app.use("/api/quizes", quizesRouter);
app.use("/api/quizesSubjects", quizesSubjectsRouter);
app.use("/api/students", studentsRouter);
app.use("/api/institutes", instituteRouter);
app.use("/api/answers", answersRouter);

app.listen(Urls.serverPort, () =>
  console.log(
    `Quiz Project server is running at ${Urls.serverDomain}:${Urls.serverPort}`
  )
);