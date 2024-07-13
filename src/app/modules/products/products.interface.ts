import { Types } from "mongoose";

export type TProducts = {
  product_name: string;
  price: number;
  description: string;
  upload_image: string;
  category: string;
  stock: number;
  cart : Types.ObjectId
};

export type TSortOption = 'low-to-high' | 'high-to-low';
