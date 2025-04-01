require("dotenv").config();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

console.log(process.env.JWT_SECRET, "authController.js");

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "User already exists" });

        user = new User({ username, email, password });
        await user.save();
        res.status(201).json({ msg: "User registered successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid credentials", isAuthenticated: false });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials", isAuthenticated: false });

        const token = jwt.sign({ id: user.id }, 'abcdefghijklmnopqrstuvwxyz', { expiresIn: "1h" });
        res.json({ token, msg: "User Logged IN", isAuthenticated: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err, msg: "Server error" });
    }
};