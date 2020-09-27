require("./app");
const config = require("./config");
const Database = require("./app/database");
const Model = require("./app/model");
const ResponseHelper = require("./app/classes/ResponseHelper");

global.ResponseHelper = ResponseHelper;
global.db = new Database(config.db.MONGO_DB_URI);
global.model = new Model(db.connection);
global.APP_SECRET = process.env.APP_SECRET || "81F44FB42275569BF89A1946CC631";
db.connect();
global.USERID = null;
global.USER = null;
