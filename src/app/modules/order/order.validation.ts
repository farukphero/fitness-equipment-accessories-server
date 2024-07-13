import mongoose from 'mongoose';
import { z } from 'zod';

const orderValidationSchema = z.object({
  body: z.object({
    cart: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: 'Invalid ObjectId format',
    }),
    full_name: z.string().min(1, { message: 'Full name is required' }),
    email: z
      .string()
      .email({ message: 'Invalid email address' })
      .min(1, { message: 'Email is required' }),
    phone_number: z.string().min(1, { message: 'Phone number is required' }),
    delivery_address: z
      .string()
      .min(1, { message: 'Delivery address is required' }),
    delivery_method: z
      .string()
      .min(1, { message: 'Delivery method is required' }),
  }),
});

export const orderValidation = {
  orderValidationSchema,
};
