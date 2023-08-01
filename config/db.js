const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect("mongodb+srv://abhay:abhay@cluster0.rrpbzty.mongodb.net/", {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    })
    .then("data", () => {
      console.log("DB Connected");
    })
    .catch((err) => {
      console.log("Connection Failed");
    });
};

module.exports = connectDB;
