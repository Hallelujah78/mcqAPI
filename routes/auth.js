const express = require("express");
const regLogLimiter = require("../middleware/rate-limit");
const {
  login,
  register,
  dashboard,
  deleteAccount,
} = require("../controllers/auth");
const authMiddleware = require("../middleware/authentication");

const router = express.Router();

router.route("/login").post(regLogLimiter, login);
router.route("/register").post(regLogLimiter, register);
// *** should move deleteAccount to its own route with updateEmail, updateName and so on
router.route("/delete-account").delete(authMiddleware, deleteAccount);
// *** REMOVE ***
router.route("/dashboard").get(authMiddleware, dashboard);
// *** REMOVE ***

module.exports = router;
