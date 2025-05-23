import { Document, model, Schema, Types } from 'mongoose';

import type { Category } from './category-model';

interface Ingredient {
  name: string;
  icon: string;
}

export interface Product extends Document {
  name: string;
  description: string;
  price: number;
  ingredients: Ingredient[];
  imagePath: string;
  category: Types.ObjectId | Category;
  createdAt: Date;
  updatedAt: Date;
}

// Schema para ingrediente
const ingredientSchema = new Schema<Ingredient>(
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
  { _id: false },
);

const productSchema = new Schema<Product>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    ingredients: {
      type: [ingredientSchema],
      required: true,
      default: [],
    },
    imagePath: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  },
  { timestamps: true },
);

export const ProductModel = model<Product>('Product', productSchema);
