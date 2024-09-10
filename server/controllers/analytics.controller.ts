import { Request, Response, NextFunction } from "express";
import errorHandler from "../utils/errorHandler";
import { catchAsyncError } from "../middleware/catchAsyncErrors";
import { generateLast12MonthData } from "../utils/analytics.generator";
import userModel from "../models/user.model";
import courseModel from "../models/course.model";
import orderModel from "../models/order.model";
import notificationModel from "../models/notification.order";

// Get users analytics -- Only Admin
export const getUsersAnalytics = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await generateLast12MonthData(userModel);

      res.status(200).json({
        success: true,
        users,
      });
    } catch (error: any) {
      return next(new errorHandler(error.message, 500));
    }
  }
);

// Get courses analytics -- Only Admin
export const getCoursesAnalytics = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courses = await generateLast12MonthData(courseModel);

      res.status(200).json({
        success: true,
        courses,
      });
    } catch (error: any) {
      return next(new errorHandler(error.message, 500));
    }
  }
);

// Get orders analytics -- Only Admin
export const getOrdersAnalytics = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orders = await generateLast12MonthData(orderModel);

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error: any) {
      return next(new errorHandler(error.message, 500));
    }
  }
);

// Get notifications analytics -- Only Admin
export const getNotificationsAnalytics = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notifications = await generateLast12MonthData(notificationModel);

      res.status(200).json({
        success: true,
        notifications,
      });
    } catch (error: any) {
      return next(new errorHandler(error.message, 500));
    }
  }
);
