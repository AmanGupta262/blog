import mongoose from "mongoose";

const URI = process.env.MONGO_DB;
mongoose.connect(`${URI}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind("Error in connecting mongodb"));

db.once("open", () => console.log("Connected to database: MongoDB"));

module.exports = db;
