var mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // Define your schema fields here
  name: String,
  email: String,
});

const User = mongoose.model("User", userSchema);
module.exports = userSchema;
