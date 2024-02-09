import { Schema, model } from "mongoose";
import { moviesT } from "./moveies";

type wishlistT = {
  name: string;
  description: string;
  movies: { _id: string }[];
  createdBy: string;
  sequenceId: number;
};

export const wishListSchema = new Schema<wishlistT>(
  {
    name: String,
    description: String,
    movies: [{ type: Schema.Types.ObjectId, ref: "movies" }],
    createdBy: Schema.ObjectId,
    sequenceId: Number,
  },
  { versionKey: false, timestamps: true }
);

const wishListModel = model<wishlistT>("wishlist", wishListSchema);

export default wishListModel;
