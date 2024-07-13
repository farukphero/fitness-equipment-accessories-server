import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OrderServices } from './order.service';

const createOrder = catchAsync(async (req, res) => {
  console.log(req.body)
  const order = await OrderServices.createOrderIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order successful!',
    data: order,
  });
});


const getAllOrders = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 5;

  const product = await OrderServices.getAllOrders(limit, page);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Orders retrieves successful!',
    data: product,
  });
});

 
const deleteOrder = catchAsync(async (req, res) => {
  const id = req.params.id

  const cart = await OrderServices.deleteOrder(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order deleted successful!',
    data: cart,
  });
});

export const orderController = {
  createOrder,
  getAllOrders,
  deleteOrder
   
};
