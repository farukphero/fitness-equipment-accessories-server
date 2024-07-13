import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { cartController } from './card.controller';
import { cartValidation } from './cart.validation';

const router = express.Router();

router
  .route('/cart')
  .post(
    validateRequest(cartValidation.cartValidationSchema),
    cartController.createCarts,
  )
  .get(cartController.getAllCarts);

router
  .route('/:id')
  .put(cartController.updateCart)
  .delete(cartController.deleteCart);

export const CartRoutes = router;
