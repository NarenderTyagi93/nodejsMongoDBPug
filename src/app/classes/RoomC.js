class RoomC {
  constructor() {}

  static async addRoom() {
    let roomPayload = {
      code: +new Date(),
      quizIds: ["5f6f944598cbda53d65e84e9"], //hardcode for now, but in future we can make it enter followed by questions
    };
    let newRoom = new model.Room(roomPayload);
    newRoom.save();
    return { code: newRoom.code };
  }

  static async joinRoom(code) {
    let room = await model.Room.findOne({ code, isActive: true }).populate(
      "quizIds"
    );
    if (!room) return { data: null };
    return { quizzes: room.quizIds, roomId: room._id };
  }
}

module.exports = RoomC;
