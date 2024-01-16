const mongoose = require("mongoose");
// const mongoURI = "mongodb://localhost:27017/inotebook"
const mongoURI =
  "mongodb+srv://tanaya:tanayaatmongo@cluster0.v4aqngi.mongodb.net/?retryWrites=true&w=majority";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("connected");
  } catch (error) {
    handleError(error);
  }
};
//using the created function
module.exports = connectToMongo;
