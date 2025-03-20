import { model, Schema } from 'mongoose';

const categorySchema = new Schema(
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
);

export const Category = model('Category', categorySchema);
