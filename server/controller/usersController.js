const { User } = require("../db/models");
const database = require("../db/models");

const getAllUsers = (req, res) => {
  database.User.findAll({
    attributes: {
    exclude: "password"
  }
})
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) =>
        res.status(400).json({
          code: 400,
          error: error.message
        })
      );
};

const getUserById = (req, res) => {
  User.findByPk(req.params.uid, {
    attributes: {
    exclude: "password"
    }
  })
  .then((result) => {
    res.status(200).json(result);
  })
  .catch((error) =>
        res.status(400).json({
          code: 400,
          error: error.message
        })
      );
};

const postUser = (req, res) => {
  const { name, email, password, role, restaurant } = req.body;
  database.User.create({
    name,
    email,
    password,
    role,
    restaurant
  })
  .then((result) => {
    res.status(201).json(result);
  })
  .catch((error) =>
      res.status(400).json({
        code: 400,
        error: error.message
      })
    );
};
    
const putUser = (req, res) => {
    const { name, email, password, role, restaurant } = req.body;
    User.update(
      {
        name,
        email,
        password,
        role, 
        restaurant
      },
      {
        where: {
          id: req.params.uid,
        },
      }
    )
      .then(() => {
        res.status(200).json({
          message: 'Updated successfully!',
        });
      })
      .catch((error) =>
        res.status(400).json({
          code: 400,
          error: error.message
        })
      );
  };

const deleteUser = (req, res) => {
    User.destroy({
      where: {
        id: req.params.uid,
      },
    })
      .then(() => {
        res.status(200).json({
          message: 'User successfully deleted :)',
        });
      })
      .catch((error) =>
        res.status(400).json({
          code: 400,
          error: error.message
        })
      );
  };

module.exports = {
  getAllUsers,
  getUserById,
  postUser,
  putUser,
  deleteUser,
};
