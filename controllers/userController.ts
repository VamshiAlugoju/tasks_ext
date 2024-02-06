import userModel, { userType } from "../models/user";
import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import sendmail from "../util/nodemailer";
import validateModel from "../models/Validate";
import { customRequest } from "../customTypes/Expresstypes";

export const secretKey = "fkdflsjf;lsdkjf;sjfpsojf;sofjos";

export async function signUp(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(200).send("user with same email already exist");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    if (name && email && password) {
      await userModel.create({ name, email, password: hashedPassword });
      const OTP = generateOtp();
      let validDoc = await validateModel.create({
        email,
        otp: OTP,
        createdAt: new Date(),
      });

      return sendmail(email, OTP)
        .then((data) => {
          return res.status(200).send("Signed up successfully");
        })
        .catch((err) => {
          validDoc.deleteOne();
          return res.send("error in creating otp, try to generate otp again");
        });
    }
    return res.status(422).send("invalid data");
  } catch (err) {
    return res.status(500).json(err);
  }
}

export async function signIn(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      if (user.validated === false)
        return res.send("your email is not validated, please verify");

      const passwordMatched = await bcrypt.compare(password, user.password);
      if (passwordMatched) {
        const token = jwt.sign(
          { name: user.name, email: user.email, _id: user.id },
          secretKey
        );
        return res.status(200).json({ token });
      } else {
        return res.status(200).send("password mismatch");
      }
    }
    return res.send("user not found, check email");
  } catch (err) {
    return res.status(500).json(err);
  }
}

export async function validateOTP(req: customRequest, res: Response) {
  try {
    const { OTP, email } = req.body;
    const validDoc = await validateModel.findOne({ email: email });
    if (!validDoc) {
      return res.send("email not found");
    }
    if (OTP === validDoc?.otp) {
      await userModel.updateOne({ email }, { validated: true });
      await validDoc?.updateOne({ is_used: true });
      return res.send("otp validated successfully");
    } else {
      return res.send("the otp you've entered is wrong");
    }
  } catch (err) {
    res.json(err);
  }
}

function generateOtp() {
  return String(Math.floor(Math.random() * 8999 + 1000));
}
