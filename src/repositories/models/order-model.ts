import { model, Schema } from 'mongoose';

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

export const Order = model('Order', orderSchema);
