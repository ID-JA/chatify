const mongoose = require("mongoose");
require("colors");

module.exports = connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/chatifyDB",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`Connected to MongoDB!`.bgYellow.underline.bold);
  } catch (error) {
    console.log(error);
  }
};
