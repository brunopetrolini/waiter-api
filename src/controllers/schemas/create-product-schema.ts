import { Types } from 'mongoose';
import { z } from 'zod';

export const createProductSchema = z.object({
  filename: z.string(),
  fields: z.object({
    name: z.string(),
    description: z.string(),
    price: z.string().transform((value) => {
      const num = parseFloat(value);
      if (isNaN(num)) throw new Error('Preço inválido');
      return num;
    }),
    ingredients: z.array(
      z.object({
        name: z.string(),
        icon: z.string(),
      }),
    ),
    category: z.string().transform((value) => new Types.ObjectId(value)),
  }),
  mimetype: z.string().refine((mime) => mime.startsWith('image/'), {
    message: 'The file must be an image',
  }),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
