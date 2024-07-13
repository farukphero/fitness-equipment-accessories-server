import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProductServices } from './products.service';

const createProduct = catchAsync(async (req, res) => {
  const product = await ProductServices.createProducts(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Product created successful!',
    data: product,
  });
});

const getCategoryProducts = catchAsync(async (req, res) => {
  

  const product = await ProductServices.getCategoryProducts(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Product retrieves successful!',
    data: product,
  });
});
const getAllProducts = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 5;

  const product = await ProductServices.getAllProducts(limit, page);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Product retrieves successful!',
    data: product,
  });
});
const getSingleProduct = catchAsync(async (req, res) => {
 
  const id = req.params.productId

  const product = await ProductServices.getSingleProduct(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Product retrieved successful!',
    data: product,
  });
});
const updateProduct = catchAsync(async (req, res) => {
   
  const id = req.params.productId
  const product = await ProductServices.updateProduct(id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Product update successful!',
    data: product,
  });
});
const deleteProduct = catchAsync(async (req, res) => {
  const id = req.params.productId

  const product = await ProductServices.deleteProduct(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Product deleted successful!',
    data: product,
  });
});

export const productController = {
  createProduct,
  getCategoryProducts,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct
};
