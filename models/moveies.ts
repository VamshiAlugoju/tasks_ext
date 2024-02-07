import mongoose, { Schema } from "mongoose";

export type moviesT = {
  _id?: any;
  title: string;
  year: string;
  genre: string;
  director: string;
  country: string;
  image: string;
  rating: string;
};

const taskSchema = new Schema<moviesT>({
  title: String,
  year: String,
  genre: String,
  director: String,
  country: String,
  image: String,
  rating: String,
});

const moviesModel = mongoose.model<moviesT>("movies", taskSchema);

export default moviesModel;
