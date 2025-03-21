import { Types } from 'mongoose';
import { z } from 'zod';

export const changeOrderStatusSchema = z.object({
  params: z.object({
    id: z.string().refine((value) => Types.ObjectId.isValid(value), {
      message: 'Invalid order ID',
    }),
  }),
  body: z.object({
    status: z.enum(['WAITING', 'IN_PRODUCTION', 'DONE'], {
      message: 'Invalid status',
    }),
  }),
});
