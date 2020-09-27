const mongoose = require("mongoose");

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

const OptionSchema = new mongoose.Schema({
  order: { type: Number },
  isCorrect: { type: Boolean, default: false },
  text: { type: String, required: true },
});

var QuestionSchema = new mongoose.Schema(
  {
    quizId: {
      type: ObjectId,
      ref: "quizzes",
      required: true,
      index: true,
    },
    marks: {
      positive: {
        type: Number,
        default: 0,
      },
      negative: {
        type: Number,
        default: 0,
      },
    },
    type: {
      type: String,
      required: true,
      default: "mcq",
    },
    order: { type: Number },
    hasMultipleAnswers: { type: Boolean, default: false },
    text: { type: String, required: true },
    options: [OptionSchema],
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

module.exports = QuestionSchema;
