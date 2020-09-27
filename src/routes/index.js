const express = require("express");
const room = require("./Room");
const quiz = require("./Quiz");

const routes = express.Router();

routes.route("/health-check").get(async (req, res) => {
  // let data = [
  //   {
  //     quizId: "5f6f944598cbda53d65e84e9",
  //     marks: {
  //       positive: 4,
  //       negative: 0,
  //     },
  //     text: "Write the missing number 438 + 210 = 210 + ______",
  //     order: 1,
  //     options: [
  //       { order: 1, text: 410 },
  //       { order: 2, text: 438, isCorrect: true },
  //       { order: 3, text: 300 },
  //       { order: 4, text: 290 },
  //     ],
  //   },
  //   {
  //     quizId: "5f6f944598cbda53d65e84e9",
  //     marks: {
  //       positive: 4,
  //       negative: 0,
  //     },
  //     order: 2,
  //     text: "0 + () = 4896",
  //     options: [
  //       { order: 1, text: 4100 },
  //       { order: 2, text: 4265 },
  //       { order: 3, text: 4986 },
  //       { order: 4, text: 4896, isCorrect: true },
  //     ],
  //   },
  //   {
  //     quizId: "5f6f944598cbda53d65e84e9",
  //     marks: {
  //       positive: 4,
  //       negative: 0,
  //     },
  //     order: 3,
  //     text: "53000 + 2000 = ______",
  //     options: [
  //       { order: 1, text: 57000 },
  //       { order: 2, text: 55000, isCorrect: true },
  //       { order: 3, text: 58000 },
  //       { order: 4, text: 61000 },
  //     ],
  //   },
  //   {
  //     quizId: "5f6f944598cbda53d65e84e9",
  //     marks: {
  //       positive: 4,
  //       negative: 0,
  //     },
  //     order: 4,
  //     text: "3 + 88 =  ______",
  //     options: [
  //       { order: 1, text: 91, isCorrect: true },
  //       { order: 2, text: 93 },
  //       { order: 3, text: 85 },
  //       { order: 4, text: 95 },
  //     ],
  //   },
  //   {
  //     quizId: "5f6f944598cbda53d65e84e9",
  //     marks: {
  //       positive: 4,
  //       negative: 0,
  //     },
  //     order: 5,
  //     text: "22 - 6 = ______",
  //     options: [
  //       { order: 1, text: 15 },
  //       { order: 2, text: 16, isCorrect: true },
  //       { order: 3, text: 17 },
  //       { order: 4, text: 18 },
  //     ],
  //   },
  // ];
  // for (let e of data) {
  //   let newQues = new model.Question(e);
  //   newQues.save();
  // }
  res.status(200).json({ message: "Real-Time-Test HEALTH: OK!" });
});

routes.route("/").get(async (req, res) => {
  res.render("home", {
    message: "Welcome to real time quiz room",
    title: "Real Time Test Platform",
  });
});

routes.use("/room", room);
routes.use("/quiz", quiz);

module.exports = routes;
