import mongoose, { Document, model, Model, Schema } from "mongoose";

interface faqItem extends Document {
  question: string;
  answer: string;
}

interface Category extends Document {
  title: string;
}

interface bannerImage extends Document {
  public_id: string;
  url: string;
}

interface Layout extends Document {
  type: string;
  faq: faqItem[];
  categories: Category[];
  banner: {
    image: bannerImage;
    title: string;
    subTitle: string;
  };
}

const faqSchema = new Schema<faqItem>({
  question: { type: String },
  answer: { type: String },
});

const categorySchema = new Schema<Category>({
  title: { type: String },
});

const bannerImageSchema = new Schema<bannerImage>({
  public_id: { type: String },
  url: { type: String },
});

const layoutSchema = new Schema<Layout>({
  type: { type: String },
  faq: { faqSchema },
  categories: { categorySchema },
  banner: {
    image: bannerImageSchema,
    title: { type: String },
    subTitle: { type: String },
  },
});

const layoutModel = model<Layout>("Layout", layoutSchema);

export default layoutModel;
