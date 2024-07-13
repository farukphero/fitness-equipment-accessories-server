import express from 'express';
import { productController } from './products.controller';
import { productValidation } from './products.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router
  .route('/create-product')
  .post(
    validateRequest(productValidation.productValidationSchema),
    productController.createProduct,
  );
router.route('/category').get(productController.getCategoryProducts);
router.route('/all/products').get(productController.getAllProducts);

router
  .route('/:productId')
  .get(productController.getSingleProduct)
  .put(
    validateRequest(productValidation.updateProductValidationSchema),
    productController.updateProduct,
  )
  .delete(productController.deleteProduct);

export const ProductRoutes = router;
