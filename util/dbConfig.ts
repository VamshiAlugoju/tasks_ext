import { connect } from "mongoose";

export default async function connectDb() {
  try {
    const url: string = process.env.DBURL ? process.env.DBURL : "";
    const connInstance = await connect(url);
    return Promise.resolve("connected Successfully");
  } catch (err) {
    return Promise.reject(err);
  }
}
