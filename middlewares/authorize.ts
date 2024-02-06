import { Response, NextFunction } from "express";
import { customRequest } from "../customTypes/Expresstypes";
import jwt, { JwtPayload } from "jsonwebtoken";
import { secretKey } from "../controllers/userController";

interface customJwtPayload extends JwtPayload {
  name?: string;
  email?: string;
}

export default async function authorize(
  req: customRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.header("authorization");
    if (token) {
      const user = <customJwtPayload>jwt.verify(token, secretKey);
      if (user.name && user.email)
        req.user = { name: user.name, email: user.email, _id: user._id };
      return next();
    }
    return res.send("token is not found");
  } catch (err) {
    return res.json(err);
  }
}
