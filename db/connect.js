const mongoose = require("mongoose");

const connectDB = (url) => {
  mongoose.connect(url);
  console.log("connected to database!");
};
module.exports = connectDB;
