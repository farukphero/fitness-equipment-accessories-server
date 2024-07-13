import mongoose, { Schema } from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema: Schema<TOrder> = new Schema<TOrder>(
  {
    cart: {
      type: Schema.ObjectId,
      required: [true, 'CartId name is required'],
      ref: 'Cart',
    },
    full_name: {
      type: String,
      required: [true, 'Full name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    phone_number: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    delivery_address: {
      type: String,
      required: [true, 'Delivery address is required'],
    },
    delivery_method: {
      type: String,
      required: [true, 'Delivery method is required'],
    },

    
  },
  {
    timestamps: true,
  },
);

export const Order = mongoose.model<TOrder>('Order', orderSchema);
