import { Schema, model } from "mongoose";

export type userWishListT = {
  _id: string;
  name: string;
};
export type userType = {
  name: string;
  email: string;
  password: string;
  phNumber?: string;
  validated?: boolean;
  OTP?: string;
  wishList: userWishListT[];
};

const userSchema = new Schema<userType>(
  {
    name: String,
    email: String,
    password: String,
    phNumber: String,
    validated: {
      type: String,
      default: false,
    },
    OTP: {
      type: String,
      default: "",
    },
    wishList: [],
  },
  { timestamps: true, versionKey: false }
);

const userModel = model<userType>("userdetails", userSchema);

export default userModel;
