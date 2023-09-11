import mongoose from "mongoose";

const connect = () => {
  const url =
    "mongodb+srv://achiewe:liverpool@cluster0.zsagq0g.mongodb.net/entertainment";
  try {
    mongoose.connect(url);
  } catch (error) {
    console.log(error);
  }
};

export default connect;
