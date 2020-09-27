const mongoose = require("mongoose");

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var AttemptedQuestionSchema = new mongoose.Schema(
  {
    questionId: { type: ObjectId, ref: "questions", index: true },
    attemptId: { type: ObjectId, ref: "attempts", index: true },
    order: { type: Number, required: true }, // if we introduce shuffle question feature
    timeTaken: { type: Number, required: true, default: 0 }, //todo
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
    selectedOptions: [],
    isAttempted: { type: Boolean, default: false },
    isCorrect: { type: Boolean, default: false },
    isPartiallyCorrect: { type: Boolean, default: false }, // todo
    isActive: { type: Boolean, default: true, index: true },
    inactiveTime: { type: Number, default: 0 }, //todo
    markForReview: { type: Boolean, default: false }, // todo
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

module.exports = AttemptedQuestionSchema;
