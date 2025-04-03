require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        console.log("Headers:", req.headers); // Debugging

        const authHeader = req.header("Authorization");
        if (!authHeader) {
            return res.status(401).json({ msg: "No token, authorization denied" });
        }

        // Extract token if it's in "Bearer <token>" format
        const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

        if (!token) {
            return res.status(401).json({ msg: "Token missing" });
        }

        const decoded = jwt.verify(token, 'abcdefghijklmnopqrstuvwxyz'); // Use env variable
        req.user = decoded;
        next();
    } catch (err) {
        console.error("JWT Error:", err.message);
        return res.status(401).json({ msg: "Invalid token" });
    }
};
