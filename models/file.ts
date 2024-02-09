import mongoose, { Schema, model } from "mongoose";

export type fileType = {
  url: string;
  name: string;
  uploadedBy: {
    _id: string;
    name: string;
  };
};

const fileSchema = new Schema<fileType>(
  {
    url: String,
    name: String,
    uploadedBy: {
      _id: Schema.ObjectId,
      name: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const fileModel = model<fileType>("file", fileSchema);

export default fileModel;
