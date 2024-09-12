import { Request, Response, NextFunction } from "express";
import { catchAsyncError } from "../middleware/catchAsyncErrors";
import LayoutModel from "../models/layout.model";
import cloudinary from "cloudinary";
import errorHandler from "../utils/errorHandler";

enum LayoutType {
  Banner = "Banner",
  FAQ = "FAQ",
  Categories = "Categories",
}

// Function to handle banner creation
const handleBannerCreation = async (req: Request) => {
  const { image, title, subTitle } = req.body;

  if (!image) {
    throw new errorHandler("Image is required for Banner type", 400);
  }

  const myCloud = await cloudinary.v2.uploader.upload(image, {
    folder: "layout",
  });

  const banner = {
    type: LayoutType.Banner,
    banner: {
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      title,
      subTitle,
    },
  };

  return banner;
};

// Function to handle FAQ creation
const handleFaqCreation = (req: Request) => {
  const { faq } = req.body;

  if (!faq || !Array.isArray(faq)) {
    throw new errorHandler("FAQ data must be an array", 400);
  }

  const faqItems = faq.map((item: { question: string; answer: string }) => ({
    question: item.question,
    answer: item.answer,
  }));

  return { type: LayoutType.FAQ, faq: faqItems };
};

// Function to handle categories creation
const handleCategoriesCreation = (req: Request) => {
  const { categories } = req.body;

  if (!categories || !Array.isArray(categories)) {
    throw new errorHandler("Categories data must be an array", 400);
  }

  const categoriesItems = categories.map((item: { title: string }) => ({
    title: item.title,
  }));

  return { type: LayoutType.Categories, categories: categoriesItems };
};

// Create Layout
export const createLayout = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;

      // Check if type already exists
      const isTypeExist = await LayoutModel.findOne({ type });
      if (isTypeExist) {
        return next(new errorHandler(`${type} already exists`, 400));
      }

      let layoutData;

      // Determine layout type and handle accordingly
      switch (type) {
        case LayoutType.Banner:
          layoutData = await handleBannerCreation(req);
          break;
        case LayoutType.FAQ:
          layoutData = handleFaqCreation(req);
          break;
        case LayoutType.Categories:
          layoutData = handleCategoriesCreation(req);
          break;
        default:
          return next(new errorHandler("Invalid layout type provided", 400));
      }

      // Create the layout in the database
      await LayoutModel.create(layoutData);

      // Send successful response
      res.status(201).json({
        success: true,
        message: "Layout created successfully",
      });
    } catch (error: any) {
      return next(new errorHandler(error.message, 500));
    }
  }
);
