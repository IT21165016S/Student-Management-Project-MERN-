const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const googleUserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("GoogleUser", googleUserSchema);
