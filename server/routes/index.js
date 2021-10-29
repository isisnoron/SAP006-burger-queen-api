const { Router } = require("express");
const router = Router();

const usersRouter = require("./usersRouter");
const productsRouter = require("./productsRouter");
const ordersRouter = require("./ordersRouter");
const authRouter = require("./authRoute");

router.use("/order", ordersRouter);
router.use("/product", productsRouter);
router.use("/user", usersRouter);
router.use("/auth", authRouter);

module.exports = router;
