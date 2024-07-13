import { z } from 'zod';

 
const cartValidationSchema = z.object({
  body: z.object({
    product: z.string({ required_error: 'Product Id is required' }),
    quantity: z.number().int().min(1, 'Quantity must be at least 1'),
  }),
});

export const cartValidation = {
  cartValidationSchema,
};
