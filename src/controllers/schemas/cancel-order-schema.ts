import { Types } from 'mongoose';
import { z } from 'zod';

export const cancelOrderSchema = z.object({
  id: z
    .string()
    .refine((value) => Types.ObjectId.isValid(value), {
      message: 'Invalid order ID',
    })
    .transform((value) => new Types.ObjectId(value)),
});
