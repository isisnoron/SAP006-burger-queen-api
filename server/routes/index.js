const { Router } = require('express');
const router = Router();

const usersRouter = require('./usersRouter');
const productsRouter = require('./productsRouter');
const ordersRouter = require('./ordersRouter');

router.use('/order', ordersRouter);
router.use('/product', productsRouter);
router.use('/user', usersRouter);


module.exports = router;