import { Document, model, Schema } from 'mongoose';

import { Product } from './product-model';

interface OrderProduct {
  product: Schema.Types.ObjectId | Product;
  quantity: number;
}

export interface Order extends Document {
  table: string;
  status: 'WAITING' | 'IN_PRODUCTION' | 'DONE';
  products: OrderProduct[];
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema(
  {
    table: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['WAITING', 'IN_PRODUCTION', 'DONE'],
      default: 'WAITING',
    },
    products: {
      type: [
        {
          product: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Product',
          },
          quantity: {
            type: Number,
            required: true,
            default: 1,
          },
        },
      ],
    },
  },
  { timestamps: true },
);

export const OrderModel = model<Order>('Order', orderSchema);
