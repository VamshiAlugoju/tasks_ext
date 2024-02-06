import { Request } from "express";
import { Schema } from "mongoose";

export interface customRequest extends Request {
  user?: {
    _id: string;
    name: string;
    email: string;
  };
}
