var express = require("express");
var router = express.Router();

const QuizC = require("../app/classes/QuizC");

router.get("/start", function (req, res, next) {
  let { id, roomId } = req.query;
  if (!id || !roomId) res.send("System Error, Please Recheck");
  else
    QuizC.startQuiz(id, roomId)
      .then((data) => {
        res.render("start-attempt", {
          message1: `Quiz : ${data.quiz.name}`,
          message2: "Answer all questions Carefully and SUBMIT ",
          title: "Real Time Test Platform",
          questions: data.questions,
          attemptId: data.attemptId,
        });
      })
      .catch((err) => {
        res.status(401).send(err);
      });
});

router.post("/submit", function (req, res, next) {
  QuizC.submitAttempt(req.query.attemptId, req.body)
    .then((data) => {
      let {
        speed,
        timeTaken,
        accuracy,
        correctAnswers,
        totalQuestions,
      } = data.report;
      res.render("show-report", {
        message: `Quiz : ${data.quizName} Completed Successfully`,
        title: "Real Time Test Platform",
        report: `You have ${correctAnswers} correct answers out of ${totalQuestions}. Speed: ${speed}  Time: ${timeTaken}  Accuracy: ${accuracy}`,
      });
    })
    .catch((err) => {
      res.status(401).send(err);
    });
});

module.exports = router;
