const mongoose = require("mongoose");

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var AttemptSchema = new mongoose.Schema(
  {
    quizId: {
      type: ObjectId,
      ref: "quizzes",
      required: true,
      index: true,
    },
    roomId: {
      type: ObjectId,
      ref: "rooms",
      required: true,
      index: true,
    },
    totalMarks: {
      type: Number,
      default: 0,
    },
    timeTaken: {
      type: Number,
      default: 0,
    },
    correctAnswers: { type: Number, default: 0, required: true },
    numberOfQuestionsAttempted: { type: Number, default: 0 },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    metadata: {},
    history: {},
    accuracy: { type: Number, default: null },
    rank: { type: Number, default: null }, // for future
    isActive: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { strict: false }
);

module.exports = AttemptSchema;
