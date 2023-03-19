const { StatusCodes } = require("http-status-codes");

const notFoundMiddleware = (err, req, res, next) => {
  return res.status(StatusCodes.NOT_FOUND).json({ msg: err });
};

module.exports = notFoundMiddleware;
