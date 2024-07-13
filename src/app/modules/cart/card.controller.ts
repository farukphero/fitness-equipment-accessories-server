import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CartServices } from './cart.service';

const createCarts = catchAsync(async (req, res) => {
  console.log(req.body)
  const cart = await CartServices.createCarts(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Add to cart successful!',
    data: cart,
  });
});


const getAllCarts = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 5;

  const product = await CartServices.getAllCarts(limit, page);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Carts retrieves successful!',
    data: product,
  });
});

 
const updateCart = catchAsync(async (req, res) => {

const id = req.params.id
console.log(req.body)
  console.log(id)
  const product = await CartServices.updateCart(id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Cart update successful!',
    data: product,
  });
});
const deleteCart = catchAsync(async (req, res) => {
  const id = req.params.id

  const cart = await CartServices.deleteCart(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Cart deleted successful!',
    data: cart,
  });
});

export const cartController = {
  createCarts,
  getAllCarts,
  updateCart,
  deleteCart
};
