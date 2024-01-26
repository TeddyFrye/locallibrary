const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost/my_database"; // Replace with your URI

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("Connected to the MongoDB database");
});

module.exports = db;
