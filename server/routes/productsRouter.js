const { Router } = require('express');
const auth = require("../controller/authController");

const {
  getAllProducts, getProductById, postProduct, putProduct, deleteProduct,
} = require('../controller/productsController');
const router = Router();

router.get("/", auth, getAllProducts);
router.post("/", auth, postProduct);
router.get("/:productId", auth, getProductById);
router.put("/:productId", auth, putProduct);
router.delete("/:productId", auth, deleteProduct);

module.exports = router;