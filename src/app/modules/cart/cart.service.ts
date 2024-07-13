import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import sanitizePayload from '../../middlewares/updateData';
import { TCart } from './cart.interface';
import { Cart } from './cart.model';
import { Product } from '../products/products.model';
import { Types } from 'mongoose';

const createCarts = async (payload: TCart) => {
  const productId = new Types.ObjectId(payload.product);

  // Find the existing cart item
  const existingCartItem = await Cart.findOne({ product: productId });

  // Find the product to check stock
  const existingProduct = await Product.findById(productId);
  if (!existingProduct) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Product not found');
  }

  if (existingCartItem) {
    const updatedQuantity = existingCartItem.quantity + payload.quantity;
    if (updatedQuantity > existingProduct.stock) {
      throw new AppError(
        StatusCodes.CONFLICT,
        `Quantity exceeds available stock.`,
      );
    }

    existingCartItem.quantity += payload.quantity;
    existingCartItem.price += existingProduct.price * payload.quantity;

    await existingCartItem.save();
    return existingCartItem;
  } else {
    const newProduct = await Cart.create({
      product: existingProduct._id,
      quantity: payload.quantity,
      price: existingProduct.price * payload.quantity,
    });

    await Product.findByIdAndUpdate(
      productId,
      {
        $set: { cart: newProduct._id },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    return newProduct;
  }
};

const getAllCarts = async (limit: number, page: number) => {
  if (isNaN(page) || page < 1) {
    page = 1;
  }
  if (isNaN(limit) || limit < 1) {
    limit = 10;
  }

  // Calculate the number of documents to skip
  const skip = (page - 1) * limit;

  const carts = await Cart.find({ quantity: { $gt: 0 } })
    .populate('product')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  if (!carts || carts.length === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No carts found.');
  }

  // Get the total count of documents in the collection
  const totalCount = await Product.countDocuments();

  const totalPages = Math.ceil(totalCount / limit);

  return {
    carts,
    meta: {
      totalCount,
      totalPages,
      currentPage: page,
    },
  };
};

const updateCart = async (id: string, payload: Partial<TCart>) => {
  const existingCart = await Cart.findById(id);
  if (!existingCart) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No cart item found.');
  }

  const existingProduct = await Product.findById(existingCart.product);
  if (!existingProduct) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No product found.');
  }

  // Ensure the quantity is defined
  if (!payload.quantity) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Quantity is required.');
  }

  if (payload.quantity > existingProduct.stock) {
    throw new AppError(
      StatusCodes.CONFLICT,
      'Quantity exceeds available stock.',
    );
  }

  existingCart.quantity = payload.quantity;
  existingCart.price = existingProduct.price * payload.quantity;

  await existingCart.save();

  return existingCart;
};

const deleteCart = async (id: string) => {
  const cart = await Cart.findByIdAndDelete(id);

  if (!cart) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No cart found.');
  }

  return cart;
};

export const CartServices = {
  createCarts,
  getAllCarts,
  updateCart,
  deleteCart,
};
