import express from "express";
import connect from "./src/database/mongo.js";
import dotenv from "dotenv";
import {
  PostInfo,
  UserInfo,
  UserLogin,
  getEntertainment,
  setBookmark,
  fetchUserEntertainmentInfo,
} from "./src/controllers/project-controller.js";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();
connect();

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.status(200).json({ message: "app works" });
});

app.post("/post", PostInfo);
app.post("/Signup", UserInfo);
app.post("/Validate", UserLogin);
app.get("/takeEntertainment", getEntertainment);
app.put("/changeBookmark/:email/:id", setBookmark);
app.get("/user", fetchUserEntertainmentInfo);

app.listen(process.env.PORT || 3000);
