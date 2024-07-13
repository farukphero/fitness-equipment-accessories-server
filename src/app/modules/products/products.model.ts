import mongoose, { Schema } from 'mongoose';
import { TProducts } from './products.interface';

const productSchema: Schema<TProducts> = new Schema<TProducts>(
  {
    cart: {
      type: Schema.ObjectId,
      ref: 'Cart',
    },
    product_name: {
      type: String,
      required: [true, 'Product name is required'],
      maxlength: [100, 'Product name must be less than 100 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [2000, 'Description must be less than 2000 characters'],
    },
    upload_image: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
    },
    stock: {
      type: Number,
      required: [true, 'Stock is required'],
      min: [0, 'Stock must be a positive number'],
    },
  },
  {
    timestamps: true,
  },
);

export const Product = mongoose.model<TProducts>('Product', productSchema);
