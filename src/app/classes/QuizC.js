class QuizC {
  constructor() {}

  static async startQuiz(quizId, roomId) {
    let promises = [];
    promises.push(
      model.Quiz.findOne({
        _id: quizId,
        isActive: true,
      }),
      model.Question.find({
        quizId,
        isActive: true,
      })
    );

    let queryData = await Promise.all(promises);
    let quiz = queryData[0];
    let questions = queryData[1];

    if (!quiz || !questions || !questions.length) return { data: null };

    //start Attempt
    let newAttempt = new model.Attempt({
      quizId,
      roomId,
      "history.attemptStartedAt": +new Date(),
    });
    newAttempt.save();

    let attemptedQuestions = [];
    for (let q of questions) {
      q.options.forEach((o) => {
        delete o.marks;
        return o;
      });
      attemptedQuestions.push(
        new model.AttemptedQuestion({
          questionId: q._id,
          attemptId: newAttempt._id,
          order: q.order,
        })
      );
    }
    await model.AttemptedQuestion.insertMany(attemptedQuestions);
    return { quiz, questions, attemptId: newAttempt._id };
  }

  static async submitAttempt(attemptId, attemptData) {
    let promises = [];
    promises.push(
      model.Attempt.findOne({
        _id: attemptId,
        isActive: true,
        isCompleted: false,
      }).populate("quizId"),
      model.AttemptedQuestion.find({
        attemptId,
        isActive: true,
      }).populate("questionId")
    );

    let queryData = await Promise.all(promises);
    let attempt = queryData[0];
    let attemptQuestions = queryData[1];

    if (!attempt || !attemptQuestions || !attemptQuestions.length)
      return { data: null };

    let totalMarks = 0;
    let numberOfQuestionsAttempted = Object.keys(attemptData).length;
    let timeTaken = +new Date() - attempt.history.attemptStartedAt;
    let correctAnswers = 0;
    let promisesWrite = [];
    let totalMarksAttempted = 0;
    for (let q of attemptQuestions) {
      let questionId = String(q.questionId._id);
      if (attemptData[questionId]) {
        totalMarksAttempted += q.questionId.marks.positive; // for accuracy
        let selectedOptions = attemptData[questionId];
        let isCorrect =
          q.questionId.options.filter(
            (o) => o._id == selectedOptions && o.isCorrect
          ).length == 1;
        if (isCorrect) {
          correctAnswers++;
          totalMarks += q.questionId.marks.positive;
        } else {
          totalMarks += q.questionId.marks.negative;
        }
        promisesWrite.push(
          model.AttemptedQuestion.updateOne(
            { attemptId, questionId: questionId },
            {
              $set: {
                isCorrect,
                "marks.positive": isCorrect ? q.questionId.marks.positive : 0,
                "marks.negative": !isCorrect ? q.questionId.marks.negative : 0,
                selectedOptions,
              },
            }
          )
        );
      }
    }
    let accuracy = (totalMarks / totalMarksAttempted) * 100;
    promisesWrite.push(
      model.Attempt.updateOne(
        { _id: attemptId },
        {
          $set: {
            isCompleted: true,
            numberOfQuestionsAttempted,
            totalMarks,
            timeTaken,
            correctAnswers,
            accuracy,
          },
        }
      )
    );

    await Promise.all(promisesWrite);

    return {
      report: {
        speed: (correctAnswers / this.minute(timeTaken)).toFixed(2),
        timeTaken,
        accuracy,
        correctAnswers,
        totalQuestions: attemptQuestions.length,
      },
      quizName: attempt.quizId.name,
    };
  }

  static minute = (timeTaken) => {
    return timeTaken / 60000; //for minute calculations
  };
}

module.exports = QuizC;
