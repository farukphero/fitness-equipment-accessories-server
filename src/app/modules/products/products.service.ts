import { TProducts, TSortOption } from './products.interface';
import { Product } from './products.model';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import sanitizePayload from '../../middlewares/updateData';

const createProducts = async (payload: TProducts) => {
  const newProduct = await Product.create(payload);
  return newProduct;
};
const getCategoryProducts = async (query: Record<string, any>) => {
  const { category, searchTerm, sort, filter } = query;

  let searchQuery: Record<string, any> = {};

  if (category) {
    const categoriesArray = (category as string).split(',');
    searchQuery.category = { $in: categoriesArray };
  }

  if (searchTerm) {
    searchQuery.product_name = { $regex: searchTerm, $options: 'i' };
  }

  if (filter) {
    const categoriesArray = (filter as string).split(',');
    searchQuery.category = { $in: categoriesArray };
  }

  const products = await Product.find(searchQuery);

  if (sort) {
    const sortOrder: Record<TSortOption, number> = {
      'low-to-high': 1,
      'high-to-low': -1,
    };

    if (sortOrder[sort as TSortOption] !== undefined) {
      products.sort(
        (a, b) => (a.price - b.price) * sortOrder[sort as TSortOption],
      );
    }
  }

  // Check if products exist
  if (!products || products.length === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No product found.');
  }

  return products;
};

const getAllProducts = async (limit: number, page: number) => {
  if (isNaN(page) || page < 1) {
    page = 1;
  }
  if (isNaN(limit) || limit < 1) {
    limit = 10;
  }

  // Calculate the number of documents to skip
  const skip = (page - 1) * limit;

  const products = await Product.find({})

    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  if (!products || products.length === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No product found.');
  }

  // Get the total count of documents in the collection
  const totalCount = await Product.countDocuments();

  const totalPages = Math.ceil(totalCount / limit);

  return {
    products,
    meta: {
      totalCount,
      totalPages,
      currentPage: page,
    },
  };
};
const getSingleProduct = async (id: string) => {
  const product = await Product.findById(id).populate("cart");

  if (!product) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No product found.');
  }

  return product;
};
const updateProduct = async (id: string, payload: Partial<TProducts>) => {
  console.log(payload);
  const sanitizedData = sanitizePayload(payload);

  const product = await Product.findByIdAndUpdate(
    id,
    {
      $set: sanitizedData,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!product) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No product found.');
  }

  return product;
};
const deleteProduct = async (id: string) => {
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No product found.');
  }

  return product;
};

export const ProductServices = {
  createProducts,
  getCategoryProducts,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
