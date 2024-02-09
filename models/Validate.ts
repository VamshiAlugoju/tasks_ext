import { Schema, model } from "mongoose";

export type validateType = {
  otp: string;
  email: string;
  is_used?: boolean;
  createdAt: Date;
};

const validateSchema = new Schema<validateType>(
  {
    email: String,
    otp: String,
    is_used: { type: Boolean, default: false },
    createdAt: Date,
  },
  { versionKey: false, timestamps: false }
);

const validateModel = model<validateType>("valildate", validateSchema);

export default validateModel;
