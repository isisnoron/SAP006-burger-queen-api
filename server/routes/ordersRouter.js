const { Router } = require('express');
const auth = require("../controller/authController");

const {
  getAllOrders, getOrderById, postOrders, putOrder, deleteOrder,
} = require('../controller/ordersController');
const router = Router();

router.get('/', auth, getAllOrders);
router.get('/:orderId',auth,  getOrderById);
router.post('/', auth, postOrders);
router.put('/:orderId', auth, putOrder);
router.delete('/:orderId', auth, deleteOrder);

module.exports = router;
