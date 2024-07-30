import { Request, Response, NextFunction } from "express";
import userModel, { IUser } from "../models/user.model";
import errorHandler from "../utils/errorHandler";
import { catchAsyncError } from "../middleware/catchAsyncErrors";
import jwt, { Secret } from "jsonwebtoken";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMail";
require("dotenv/config");

// register user
interface IRegistationBody {
  name: string;
  email: string;
  password: string;
  avat?: string;
}

interface IActivationToken {
  token: string;
  activationCode: string;
}

export const registrationUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;

      const isEmailExist = await userModel.findOne({ email });

      if (isEmailExist) {
        return next(new errorHandler("Email already exist", 400));
      }

      const user: IRegistationBody = {
        name,
        email,
        password,
      };

      const activationToken = createActivationToken(user);

      const activationCode = activationToken.activationCode;

      const data = { user: { name: user.name }, activationCode };
      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/activationMail.ejs"),
        data
      );

      try {
        await sendMail({
          email: user.email,
          subject: "Activate your account",
          template: "activationMail.ejs",
          data,
        });

        res.status(201).json({
          success: true,
          message: `Please check your email: ${user.email} to activate your email!`,
          activationToken: activationToken.token,
        });
      } catch (error: any) {
        return next(new errorHandler(error.message, 400));
      }
    } catch (error: any) {
      return next(new errorHandler(error.message, 400));
    }
  }
);

export const createActivationToken = (user: any): IActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

  const token = jwt.sign(
    { user, activationCode },
    process.env.ACTIVATION_SECRET as Secret,
    {
      expiresIn: "5m",
    }
  );

  return { token, activationCode };
};
