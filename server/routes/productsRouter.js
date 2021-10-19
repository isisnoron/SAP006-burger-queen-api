const { Router } = require('express');

const {
  getAllProducts, getProductById, postProduct, putProduct, deleteProduct,
} = require('../controller/productsController');
const router = Router();

router.get("/", getAllProducts);
router.post("/", postProduct);
router.get("/:productId", getProductById);
router.put("/:productId", putProduct);
router.delete("/:productId", deleteProduct);

module.exports = router;