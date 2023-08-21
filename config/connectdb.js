const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connection successful");
  } catch (error) {
    console.log("DB Connection Failed" + error);
  }
};

module.exports = connectDB;
