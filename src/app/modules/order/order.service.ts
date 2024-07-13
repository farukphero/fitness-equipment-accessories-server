import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { Product } from '../products/products.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';
import { Cart } from '../cart/cart.model';

const createOrderIntoDB = async (payload: TOrder) => {
  const session = await Order.startSession();
  session.startTransaction();

  try {
    const { cart } = payload;

    const newOrder = new Order(payload);
    await newOrder.save({ session });

    const existingCart = await Cart.findById(cart).session(session);
    const existingProduct = await Product.findById(
      existingCart?.product,
    ).session(session);

    if (!existingCart || !existingProduct) {
      throw new AppError(StatusCodes.CONFLICT, 'No cart found.');
    }

    if (existingProduct.stock < existingCart.quantity) {
      throw new AppError(
        StatusCodes.CONFLICT,
        'Not enough stock for this product',
      );
    }

    existingProduct.stock -= existingCart.quantity;
    existingCart.quantity -= existingCart.quantity;

    await existingProduct.save({ session });
    await existingCart.save({ session });

    await session.commitTransaction();
    session.endSession();

    return newOrder;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    if (error instanceof Error) {
      throw new AppError(StatusCodes.BAD_REQUEST, error.message);
    }
  }
};

const getAllOrders = async (limit: number, page: number) => {
  if (isNaN(page) || page < 1) {
    page = 1;
  }
  if (isNaN(limit) || limit < 1) {
    limit = 10;
  }

  // Calculate the number of documents to skip
  const skip = (page - 1) * limit;

  const orders = await Order.find({})
    .populate('cart')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

    console.log(orders)

  if (!orders || orders.length === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No orders found.');
  }

  // Get the total count of documents in the collection
  const totalCount = await Product.countDocuments();

  const totalPages = Math.ceil(totalCount / limit);

  return {
    orders,
    meta: {
      totalCount,
      totalPages,
      currentPage: page,
    },
  };
};

const deleteOrder = async (id: string) => {
  const order = await Order.findByIdAndDelete(id);

  if (!order) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No order found.');
  }

  return order;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrders,
  deleteOrder
};
