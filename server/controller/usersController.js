// const { User } = require("../db/models");
const database = require("../db/models");

const getAllUsers = (req, res) => {
  const users = database.User.findAll({
    order: [["id", "ASC"]],
    attributes: { exclude: ["password"] },
  });
  users
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => next({ code: 400, err }));
};

const getUserById = (req, res) => {
  User.findByPk(req.params.uid, {
    attributes: {
      exclude: "password",
    },
  })
    .then((result) => {
      res.status(200).json(result);
    })
};

const postUser = (req, res, next) => {
  const { name, email, password, role } = req.body;
  if (!name || !password || !role) {
    return res.status(400).send({
      message: "Missing required data",
    });
  }
  User.create({
    name,
    email,
    password,
    role,
  })
    .then((result) => {
      res.status(201).json(result);
    })
    .catch(next);
};

const putUser = (req, res) => {
  const { name, email, password, role } = req.body;
  const update = User.update(
    {
      name,
      email,
      password,
      role,
    },
    {
      where: {
        id: req.params.uid,
      },
    }
  );
  return res.status(201).send(update);
};

const deleteUser = (req, res, next) => {
  User.destroy({
    where: {
      id: req.params.uid,
    },
  })
    .then(() => {
      res.status(200).json({
        message: "User successfully deleted.",
      });
    })
    .catch(next);
};

module.exports = {
  getAllUsers,
  getUserById,
  postUser,
  putUser,
  deleteUser,
};
