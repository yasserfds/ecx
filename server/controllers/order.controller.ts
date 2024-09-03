import { Request, Response, NextFunction } from "express";
import { catchAsyncError } from "../middleware/catchAsyncErrors";
import errorHandler from "../utils/errorHandler";
import orderModel, { IOrder } from "../models/order.model";
import userModel from "../models/user.model";
import courseModel from "../models/course.model";
import notificationModel from "../models/notification.order";
import sendMail from "../utils/sendMail";
import path from "path";
import ejs from "ejs";
import { OrganizeImportsMode } from "typescript";
import { newOrder } from "../services/order.service";
import { privateDecrypt } from "crypto";

// Create order
export const createOrder = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, paymentInfo } = req.body as IOrder;

      const user = await userModel.findById(req.user?._id);

      const courseExistUser = user?.courses.some(
        (course: any) => course._id.toString() === courseId
      );

      if (courseExistUser) {
        return next(
          new errorHandler("You have already purchased this course", 400)
        );
      }

      const course = await courseModel.findById(courseId);

      if (!course) {
        return next(new errorHandler("Course not found", 404));
      }

      const data: any = {
        courseId: course._id,
        userId: user?._id,
        paymentInfo,
      };

      const mailData = {
        order: {
          _id: course.id.toString().slice(0, 6),
          name: course.name,
          price: course.price,
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        },
      };

      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/orderConfirmation.ejs"),
        { order: mailData }
      );

      try {
        if (user) {
          await sendMail({
            email: user.email,
            subject: "Order Confirmation",
            template: "orderConfirmation.ejs",
            data: mailData,
          });
        }
      } catch (error: any) {
        return next(new errorHandler(error.message, 500));
      }

      user?.courses.push(course?.id);

      await user?.save();

      await notificationModel.create({
        user: user?._id,
        title: "New Order",
        message: `You have a new order from ${course?.name}`,
      });

      newOrder(data, res, next);
    } catch (error: any) {
      return next(new errorHandler(error.message, 500));
    }
  }
);
