const { Router } = require('express');
const auth = require("../controller/authController")

const {
  getAllUsers, getUserById, postUser, putUser, deleteUser,
} = require('../controller/usersController');
const router = Router();

router.get("/", auth, getAllUsers);
router.get("/:uid", auth, getUserById);
router.post("/", postUser);
router.put("/:uid", auth, putUser);
router.delete("/:uid", auth, deleteUser);

module.exports = router;