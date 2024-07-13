import { z } from 'zod';

export const productValidationSchema = z.object({
  body: z.object({
    product_name: z
      .string({ required_error: 'Product name is required.' })
      .min(1, { message: 'Product name is required' })
      .max(100, { message: 'Product name must be less than 100 characters' }),
    price: z
      .number({ required_error: 'Price is required' })
      .min(0, { message: 'Price must be a positive number' }),
    description: z
      .string()
      .min(1, { message: 'Description is required' })
      .max(1000, { message: 'Description must be less than 1000 characters' }),
    upload_image: z
      .string({ required_error: 'Image is required' })
      .url({ message: 'Image URL must be a valid URL' })
      .min(1, { message: 'Image URL is required' }),
    category: z.string().min(1, { message: 'Category is required' }),
    stock: z.number().min(0, { message: 'Stock must be a positive number' }),
  }),
});
export const updateProductValidationSchema = z.object({
  body: z.object({
    product_name: z
      .string({ required_error: 'Product name is required.' })
      .min(1, { message: 'Product name is required' })
      .max(100, { message: 'Product name must be less than 100 characters' }).optional(),
    price: z
      .number({ required_error: 'Price is required' })
      .min(0, { message: 'Price must be a positive number' }).optional(),
    description: z
      .string()
      .min(1, { message: 'Description is required' })
      .max(1000, { message: 'Description must be less than 1000 characters' }).optional(),
    upload_image: z
      .string({ required_error: 'Image is required' })
      .url({ message: 'Image URL must be a valid URL' })
      .min(1, { message: 'Image URL is required' }).optional(),
    category: z.string().min(1, { message: 'Category is required' }).optional(),
    stock: z.number().min(0, { message: 'Stock must be a positive number' }).optional(),
  }),
});

export const productValidation = {
  productValidationSchema,
  updateProductValidationSchema
};
