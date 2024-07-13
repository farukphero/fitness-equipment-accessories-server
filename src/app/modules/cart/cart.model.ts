import mongoose, { Schema } from 'mongoose';
import { TCart  } from './cart.interface';

const cartSchema: Schema<TCart> = new Schema<TCart>(
  {
    product: {
      type: Schema.ObjectId,
      required: [true, 'ProductId name is required'],
       ref:"Product"
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number'],
    },
     
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity must be a positive number'],
    },
     
  },
  {
    timestamps: true,
  },
);

export const Cart = mongoose.model<TCart>('Cart', cartSchema);
