import { Schema, model } from "mongoose";
import { moviesT } from "./moveies";

type wishlistT = {
  name: string;
  description: string;
  movies: { _id: string }[];
  createdBy: string;
};

const wishListSchema = new Schema<wishlistT>(
  {
    name: String,
    description: String,
    movies: [],
    createdBy: Schema.ObjectId,
  },
  { versionKey: false, timestamps: true }
);

const wishListModel = model<wishlistT>("wishlist", wishListSchema);

export default wishListModel;
