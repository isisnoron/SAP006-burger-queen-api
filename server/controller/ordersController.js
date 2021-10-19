const { Order } = require("../db/models");

// const express = require("express");
// const app = express()
// const isis = [];
// app.use(express.json())
// app.listen(3330, () => console.log("agora vai em nome de Deus"));

// app.post("/orders", (request, response) => {
//   const { title, name } =  request.body;
//   const julli = {title, name}
//   isis.push(julli)
//   return response.json(julli)
// });

const getAllOrders = (req, res) => {
 Order.findAll()
 .then((result) => {
  res.status(200).send(result);
 });
 
};
const getOrderById = (req, res) => {
  Order.findByPk(req.params.orderId)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(() =>
      res.status(400).json({
        message: "ERROR! Try again!",
      })
    );
};

// não funciona, falta terminar
const postOrders = (req, res, next) => {
  const { client_name, user_id, table, status } = req.body;
  Order.create({
    client_name,
    user_id,
    table,
    status,
  })
    .then((result) => {
      res.status(201).json(result);
    })
    .catch(next);
};

const putOrder = (req, res, next) => {
  const { client_name, user_id, table, status } = req.body;
  Order.update(
    {
      client_name,
      user_id,
      table,
      status,
    },
    {
      where: {
        id: req.params.orderId,
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

const deleteOrder = (req, res, next) => {
  Order.destroy({
    where: {
      id: req.params.orderId,
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
  getAllOrders,
  getOrderById,
  postOrders,
  putOrder,
  deleteOrder,
};
