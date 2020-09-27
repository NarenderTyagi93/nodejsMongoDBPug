const Room = require("./schema/Room");
const Question = require("./schema/Question");
const Quiz = require("./schema/Quiz");
const Attempt = require("./schema/Attempt");
const AttemptedQuestion = require("./schema/AttemptedQuestion");

class Model {
  constructor(dbConnection) {
    this.Room = dbConnection.model("rooms", Room);
    this.Question = dbConnection.model("questions", Question);
    this.Quiz = dbConnection.model("quizzes", Quiz);
    this.Attempt = dbConnection.model("attempts", Attempt);
    this.AttemptedQuestion = dbConnection.model(
      "attemptedquestions",
      AttemptedQuestion
    );
  }
}

module.exports = Model;
