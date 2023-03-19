const rateLimiter = require("express-rate-limit");

const regLogLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // the time period = 15 minutes
  max: 10, // the requests allowed in each time period
  message:
    "You can't make any more requests at the moment. Please try again later.",
});

module.exports = regLogLimiter;
