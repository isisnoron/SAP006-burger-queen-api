const { Product } = require("../db/models");

const getAllProducts = (req, res, next) => {
  Product.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(next);
};


const getProductById = (req, res, next) => {
  Product.findByPk(req.params.productId)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(next);
};

const postProduct = (req, res, next) => {
  const { name, flavor, complement, price, image, type, subtype } = req.body;
  Product.create({
    name,
    flavor,
    complement,
    price,
    image,
    type,
    subtype,
  })
    .then((result) => {
      res.status(201).send(result);
    })
    .catch(next);
};

const putProduct = (req, res, next) => {
  const { name, price, flavor, complement, image, type, sub_type } = req.body;
  Product.update(
    {
      name,
      price,
      flavor,
      complement,
      image,
      type,
      sub_type,
    },
    {
      where: {
        id: req.params.productId,
      },
    }
  )
    .then(() => {
      res.status(200).json({
        message: "Updated successfully!",
      });
    })
    .catch(next);
};

const deleteProduct = (req, res, next) => {
  Product.destroy({
    where: {
      id: req.params.productId,
    },
  })
    .then(() => {
      res.status(200).json({
        message: "Successfully deleted!",
      });
    })
    .catch(next);
};

module.exports = {
  getAllProducts,
  getProductById,
  postProduct,
  putProduct,
  deleteProduct,
};
