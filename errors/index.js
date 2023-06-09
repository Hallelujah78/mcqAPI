const { CustomAPIError } = require("./custom-error");
const BadRequestError = require("./bad-request");
const UnauthenticatedError = require("./unauthenticated");
const NotFoundError = require("./not-found");

module.exports = {
  BadRequestError,
  UnauthenticatedError,
  CustomAPIError,
  NotFoundError,
};
