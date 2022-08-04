const mongoose = require("mongoose");
require("colors");

module.exports = connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB Atlas!".bgYellow.underline.bold);
  } catch (error) {
    console.log(error);
  }
};
