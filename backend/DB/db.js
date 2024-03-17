const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("DB Connected");
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = connectDB;
