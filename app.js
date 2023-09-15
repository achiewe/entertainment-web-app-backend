import express from "express";
import connect from "./src/database/mongo.js";
import dotenv from "dotenv";
import {
  PostInfo,
  UserInfo,
  UserLogin,
} from "./src/controllers/project-controller.js";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();
connect();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  return res.status(200).json({ message: "app works" });
});

app.post("/post", PostInfo);
app.post("/Signup", UserInfo);
app.post("/Validate", UserLogin);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
