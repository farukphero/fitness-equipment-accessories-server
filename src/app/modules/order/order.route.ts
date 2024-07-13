import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { orderController } from './order.controller';
import { orderValidation } from './order.validation';

const router = express.Router();

router
  .route('/order')
  .post(
    validateRequest(orderValidation.orderValidationSchema),
    orderController.createOrder,
  )
  .get(orderController.getAllOrders);

router
  .route('/:id')
  .delete(orderController.deleteOrder);

export const OrderRoutes = router;
