const mongoose = require("mongoose");

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var RoomSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      index: { unique: true },
    },
    quizIds: [{ type: ObjectId, ref: "quizzes", index: true }], // one rom can have multiple quizes
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

module.exports = RoomSchema;
