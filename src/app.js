var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var path = require("path");

module.exports = new (class App {
  constructor() {
    this.init();
  }
  init() {
    var app = express();

    app.use(
      logger(
        ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms ":referrer" ":user-agent"'
      )
    );

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.engine("pug", require("pug").__express);
    app.set("views", path.join(__dirname, "views"));
    app.set("view engine", "pug");

    const api = require("./routes/");

    app.use("/", api);

    // error handler
    app.use(function (err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get("env") === "development" ? err : {};

      // render the error page
      res.status(err.status || 500).json({ message: "Something went wrong" });
    });

    app.listen(process.env.PORT || 3000, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(
        `Express Server is now running on localhost:${process.env.PORT || 3000}`
      );
    });
  }
})();
