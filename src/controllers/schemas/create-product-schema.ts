import { Types } from 'mongoose';
import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.string().transform((value) => {
    const num = parseFloat(value);
    if (isNaN(num)) throw new Error('Preço inválido');
    return num;
  }),
  ingredients: z
    .string()
    .optional()
    .transform((value) => {
      if (!value) return [];
      try {
        return JSON.parse(value);
      } catch {
        throw new Error('Formato inválido para ingredients');
      }
    })
    .pipe(
      z
        .array(
          z.object({
            name: z.string(),
            icon: z.string(),
          }),
        )
        .default([]),
    ),
  category: z.string().transform((value) => new Types.ObjectId(value)),
});
