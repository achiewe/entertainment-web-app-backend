import { Schema, model } from "mongoose";

const userSChema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },

  entertainmentInfo: [
    {
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
    },
  ],
});

const User = model("user", userSChema);

export default User;
