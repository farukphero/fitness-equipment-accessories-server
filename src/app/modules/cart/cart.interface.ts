import { Types } from "mongoose";

export type TCart = {
  product: Types.ObjectId;
  price: number;
  quantity: number;
   
};

 
