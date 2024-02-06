import mongoose, { Schema } from "mongoose";

export type taskT = {
  tName: string;
  tDescription: string;
};

const taskSchema = new Schema<taskT>({
  tName: { type: String, required: true },
  tDescription: { type: String, required: true },
});

const taskModel = mongoose.model<taskT>("tasks", taskSchema);

export default taskModel;
