import { Types } from 'mongoose';
import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().min(0),
  ingredients: z.array(
    z.object({
      name: z.string(),
      icon: z.string(),
    }),
  ),
  category: z.string().transform((value) => new Types.ObjectId(value)),
  imagePath: z.string(),
});
