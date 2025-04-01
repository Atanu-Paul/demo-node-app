require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://atanu:nV5eQ2BstDyyNncB@cluster0.hqci7sj.mongodb.net/react-demo-db');
        console.log("MongoDB Connected");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};
module.exports = connectDB;