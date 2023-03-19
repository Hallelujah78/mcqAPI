const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide a name"],
    minLength: 3,
    maxlength: 20,
  },

  email: {
    type: String,
    required: [true, "please provide an email address"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "please enter a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
    minLength: 6,
  },
  creationDate: {
    type: Date,
    default: Date.now(),
  },
});

UserSchema.pre("save", async function (next) {
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_TIME }
  );
};

UserSchema.methods.validatePassword = async function (reqPass) {
  const isMatch = await bcryptjs.compare(reqPass, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
