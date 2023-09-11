import express from "express";
import connect from "./database/mongo.js";

connect();

const app = express();

app.get("/", (req, res) => {
  return res.status(200).json({ message: "app works" });
});

app.listen(3000);
