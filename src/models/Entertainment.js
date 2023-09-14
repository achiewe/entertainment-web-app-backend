import { Schema, model } from "mongoose";

const projectSchema = new Schema({
  title: String,
  thumbnail: {
    trending: {
      small: String,
      large: String,
    },
    regular: {
      small: String,
      medium: String,
      large: String,
    },
  },
  year: Number,
  category: String,
  rating: String,
  isBookmarked: Boolean,
  isTrending: Boolean,
});

const Entertainment = model("Entertainment", projectSchema);

export default Entertainment;
