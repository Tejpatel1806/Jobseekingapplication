const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  getUser,
} = require("../controllers/userController");
const { isAuthenticated } = require("../middlewares/auth");
router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/getuser", isAuthenticated, getUser);
module.exports = router;
