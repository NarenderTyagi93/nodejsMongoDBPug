var express = require("express");
var router = express.Router();

const RoomC = require("../app/classes/RoomC");

router.post("/add", function (req, res, next) {
  RoomC.addRoom()
    .then((data) => {
      res.render("room_create_success", {
        message: `Room Created Successfully, You can join`,
        link: ` http://${process.env.Host || "127.0.0.1:3000"}/room/join?code=${
          data.code
        }`,
        title: "Real Time Test Platform",
      });
    })
    .catch((err) => {
      res.status(401).send(err);
    });
});

router.get("/join/?", function (req, res, next) {
  let roomCode = req.query.code || req.body.code;
  RoomC.joinRoom(roomCode)
    .then((data) => {
      if (!data || !data.quizzes || !data.quizzes.length) {
        res.send("No Active Quiz in this room");
      } else {
        res.render("quiz_list", {
          message: `Start your favorite quiz`,
          quizzes: data.quizzes,
          link: ` http://${
            process.env.Host || "127.0.0.1:3000"
          }/quiz/start?id=`,
          roomId: data.roomId,
          title: "Real Time Test Platform",
        });
      }
    })
    .catch((err) => {
      res.status(401).send(err);
    });
});

router.get("/join-form", function (req, res, next) {
  res.render("join_form", {
    message: `Room Created Successfully, You can join`,
    title: "Real Time Test Platform",
  });
});

module.exports = router;
