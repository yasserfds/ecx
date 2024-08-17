import { Request, Response, NextFunction } from "express";
import userModel, { IUser } from "../models/user.model";
import errorHandler from "../utils/errorHandler";
import { catchAsyncError } from "../middleware/catchAsyncErrors";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMail";
import {
  accessTokenOptions,
  refreshTokenOptions,
  sendToken,
} from "../utils/jwt";
import { redis } from "../utils/redis";
import { getUserById } from "../services/user.service";
require("dotenv/config");

// Register User
interface IRegistationBody {
  name: string;
  email: string;
  password: string;
  avatar?: string;
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

// Activation Token
interface IActivationToken {
  token: string;
  activationCode: string;
}

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

// Activate User
interface IActivationRequest {
  activation_token: string;
  activation_code: string;
}

export const activateUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { activation_token, activation_code } =
        req.body as IActivationRequest;

      const newUser: { user: IUser; activationCode: string } = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET as string
      ) as { user: IUser; activationCode: string };

      if (newUser.activationCode !== activation_code) {
        return next(new errorHandler("Invalid activation code", 400));
      }

      const { name, email, password } = newUser.user;

      const existUser = await userModel.findOne({ email });

      if (existUser) {
        return next(new errorHandler("Email already exist", 400));
      }

      const user = await userModel.create({ name, email, password });

      const data = { user: { name: user.name } };
      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/confirmMail.ejs"),
        data
      );

      try {
        await sendMail({
          email: user.email,
          subject: "User activated successfully",
          template: "confirmMail.ejs",
          data,
        });

        res.status(201).json({
          success: true,
          message: "User activated successfully",
        });
      } catch (error: any) {
        return next(new errorHandler(error.message, 400));
      }
    } catch (error: any) {
      return next(new errorHandler(error.message, 400));
    }
  }
);

// Login User
interface ILoginRequest {
  email: string;
  password: string;
}

export const loginUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as ILoginRequest;

      if (!email || !password) {
        return next(new errorHandler("Please enter email and password", 400));
      }

      const user = await userModel.findOne({ email }).select("+password");

      if (!user) {
        return next(new errorHandler("Invalid email or password", 400));
      }

      const isPasswordMatch = await user.comparePassword(password);

      if (!isPasswordMatch) {
        return next(new errorHandler("Invalid email or password", 400));
      }

      sendToken(user, 200, res);
    } catch (error: any) {
      return next(new errorHandler(error.message, 400));
    }
  }
);

// Logout User
export const logoutUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.cookie("access_token", "", { maxAge: 1 });
      res.cookie("refresh_token", "", { maxAge: 1 });

      const userId = (req.user?._id || "") as string;
      await redis.del(userId);

      res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (error: any) {
      return next(new errorHandler(error.message, 400));
    }
  }
);

// Update access token
export const updateAccessToken = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refresh_token = req.cookies.refresh_token as string;
      const decoded = jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN as string
      ) as JwtPayload;

      const message = "Couldn't refresh token";
      if (!decoded) {
        return next(new errorHandler(message, 400));
      }

      const session = await redis.get(decoded.id as string);

      if (!session) {
        return next(new errorHandler(message, 400));
      }

      const user = JSON.parse(session);

      const accessToken = jwt.sign(
        { id: user._id },
        process.env.ACCESS_TOKEN as string,
        {
          expiresIn: "5m",
        }
      );

      const refreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN as string,
        {
          expiresIn: "3d",
        }
      );

      res.cookie("access_token", accessToken, accessTokenOptions);
      res.cookie("refresh_token", refreshToken, refreshTokenOptions);

      res.status(200).json({
        status: "success",
        accessToken,
      });
    } catch (error: any) {
      return next(new errorHandler(error.message, 400));
    }
  }
);

// Get user info
export const getUserInfo = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id as string;
      getUserById(userId, res);
    } catch (error: any) {
      return next(new errorHandler(error.message, 400));
    }
  }
);

// Social auth
interface ISocialAuthBody {
  email: string;
  name: string;
  avatar: string;
}

export const socialAuth = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, name, avatar } = req.body as ISocialAuthBody;
      const user = await userModel.findOne({ email });

      if (!user) {
        const newUser = await userModel.create({ email, name, avatar });
        sendToken(newUser, 200, res);
      } else {
        sendToken(user, 200, res);
      }
    } catch (error: any) {
      return next(new errorHandler(error.message, 400));
    }
  }
);
