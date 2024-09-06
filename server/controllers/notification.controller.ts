import notificationModel from "../models/notification.order";
import { Request, Response, NextFunction } from "express";
import { catchAsyncError } from "../middleware/catchAsyncErrors";
import errorHandler from "../utils/errorHandler";

// Get all notification -- only admin
export const getNotifications = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notifications = await notificationModel
        .find()
        .sort({ createdAt: -1 });

      res.status(201).json({
        succss: true,
        notifications,
      });
    } catch (error: any) {
      return next(new errorHandler(error.message, 500));
    }
  }
);

// Update motification status // only admin
export const updateNotificationStatus = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notification = await notificationModel.findById(req.params.id);

      if (!notification) {
        return next(new errorHandler("Notification not found", 400));
      } else {
        notification.status
          ? (notification.status = "read")
          : notification?.status;
      }

      await notification.save();

      const notifications = await notificationModel
        .find()
        .sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        notifications,
      });
    } catch (error: any) {
      return next(new errorHandler(error.message, 500));
    }
  }
);
