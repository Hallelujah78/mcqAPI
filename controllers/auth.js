const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors");

// *** REMOVE ***

const emailValidator = require("deep-email-validator");
// *** REMOVE ***
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("please provide an email and a password!");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError(
      "you are not authorized to access this resource"
    );
  }
  const isMatch = await user.validatePassword(password);
  if (!isMatch) {
    throw new UnauthenticatedError("invalid password");
  }

  const token = user.createJWT();
  return res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

const register = async (req, res) => {
  const user = await User.create({ ...req.body });

  const token = user.createJWT();
  return res
    .status(StatusCodes.CREATED)
    .json({ user: { userId: user._id, name: user.name }, token });
};
// *** should move deleteAccount into its own controller with updateName, updateEmail etc
const deleteAccount = async (req, res) => {
  const { userId } = req.user;
  const user = await User.findOneAndRemove({ _id: userId });
  if (!user) {
    throw new NotFoundError(`no user found with user ID ${userId}`);
  }
  res
    .status(StatusCodes.OK)
    .json({ status: "success", msg: `user ${userId} has been deleted` });
};

// *** REMOVE ***
const dashboard = async (req, res) => {
  const { userId, name } = req.user;
  const user = await User.findOne({ _id: userId });

  let validEmail = await emailValidator.validate(user.email);

  let isValid = "fake";
  if (validEmail.valid) {
    isValid = "genuine";
  }
  res
    .status(StatusCodes.OK)
    .send(
      `<h1>Dashboard</h1>\n\n Welcome back ${name}. Your email is ${user.email}. Your userId is ${user._id}. You used a ${isValid} email address to register your account!`
    );
};
// *** REMOVE ***

module.exports = { login, register, dashboard, deleteAccount };
