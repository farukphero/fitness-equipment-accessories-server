import { Types } from 'mongoose';

export type TOrder = {
  cart: Types.ObjectId;
  full_name: string;
  email: string;
  phone_number: string;
  delivery_address: string;
  delivery_method: string;
};
