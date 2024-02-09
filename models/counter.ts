import mongoose, { Schema, model } from "mongoose";

export type counterT = {
  wishList: number;
  name: string;
};

const counterSchema = new Schema<counterT>(
  {
    wishList: Number,
    name: String,
  },
  { versionKey: false, timestamps: true }
);

const counterModel = model<counterT>("counter", counterSchema);

export default counterModel;
