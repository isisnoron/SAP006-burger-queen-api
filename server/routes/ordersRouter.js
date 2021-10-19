const { Router } = require('express');

const {
  getAllOrders, getOrderById, postOrders, putOrder, deleteOrder,
} = require('../controller/ordersController');
const router = Router();

router.get('/', getAllOrders);
router.get('/:orderId', getOrderById);
router.post('/', postOrders);
router.put('/:orderId', putOrder);
router.delete('/:orderId', deleteOrder);

module.exports = router;