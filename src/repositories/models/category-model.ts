import { model, Schema } from 'mongoose';

export interface Category extends Document {
  name: string;
  icon: string;
  createdAt: Date;
  updatedAt: Date;
}

export const CategoryModel = model<Category>(
  'Category',
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      icon: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    },
  ),
);
