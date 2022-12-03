const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user_model_v2");
db.food = require("./food_model");

// db.ROLES = ["user", "admin", "moderator"];

module.exports = db;