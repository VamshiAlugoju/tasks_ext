import { Schema, model } from "mongoose";

export type userType = {
  name: string;
  email: string;
  password: string;
  phNumber?: string;
  validated?: boolean;
};

const userSchema = new Schema<userType>({
  name: String,
  email: String,
  password: String,
  phNumber: String,
  validated: {
    type: String,
    default: false,
  },
});

const userModel = model<userType>("userdetails", userSchema);

export default userModel;
