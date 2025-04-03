const express = require("express");
const { register, login, createUserProfile, getUserProfile } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/profile/create", authMiddleware, createUserProfile);
router.get("/profile/:userId", authMiddleware, getUserProfile);
router.get("/protected", authMiddleware, (req, res) => {
    res.json({ msg: "Welcome to the protected route", user: req.user });
});

module.exports = router;