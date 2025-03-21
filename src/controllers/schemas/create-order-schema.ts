import { Types } from 'mongoose';
import { z } from 'zod';

export const createOrderSchema = z.object({
  table: z.string(),
  products: z.array(
    z.object({
      product: z.string().transform((value) => new Types.ObjectId(value)),
      quantity: z.number().min(1),
    }),
  ),
});
