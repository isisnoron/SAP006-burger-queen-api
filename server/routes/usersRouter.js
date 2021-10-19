const { Router } = require('express');

const {
  getAllUsers, getUserById, postUser, putUser, deleteUser,
} = require('../controller/usersController');
const router = Router();

router.get("/", getAllUsers);
router.get("/:uid", getUserById);
router.post("/", postUser);
router.put("/:uid", putUser);
router.delete("/:uid", deleteUser);

module.exports = router;