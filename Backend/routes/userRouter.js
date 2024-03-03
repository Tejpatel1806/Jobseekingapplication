const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/userController");
const { isAuthenticated } = require("../middlewares/auth");
router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
module.exports = router;
