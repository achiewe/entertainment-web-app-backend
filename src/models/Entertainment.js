import { Schema, model } from "mongoose";

const projectSchema = new Schema({
  title: {
    type: Schema.Types.String,
    required: true,
  },
  thumbnail: {
    trending: {
      small: { type: Schema.Types.String, required: true },
      medium: { type: Schema.Types.String, required: true },
      large: { type: Schema.Types.String, required: true },
    },
  },
  year: {
    type: Schema.Types.Number,
    required: true,
  },
  category: {
    type: Schema.Types.String,
    required: true,
  },
  rating: {
    type: Schema.Types.String,
    required: true,
  },
  isBookmarked: {
    type: Schema.Types.Boolean,
    required: true,
  },
  isTrending: {
    type: Schema.Types.Boolean,
    required: true,
  },
});
