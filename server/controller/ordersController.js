const { Order, ProductOrder, Product } = require("../db/models");

const getOrderWithProducts = (id) =>
  Order.findByPk(id, {
    include: [
      {
        model: Product,
        as: "Products",
        required: false,
        attributes: ["id", "name", "flavor", "complement"],
        through: {
          model: ProductOrder,
          attributes: ["qtd"],
        },
      },
    ],
  });

const getAllOrders = (req, res) => {
 Order.findAll({
  include: [
    {
      model: Product,
      as: 'Product',
      required: false,
      attributes: [
        'id',
        'name',
        'price',
        'flavor',
        'complement',
        'image',
        'type',
        'sub_type',
      ],
      through: {
        model: ProductOrder,
        as: 'ProductOrder',
        attributes: ['qtd'],
      },
    },
  ],
})
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

const postOrders = async (req, res) => {
  const { client_name, user_id, table, products } = req.body;
  const order = await Order.create({
    client_name,
    table,
    user_id,
    status: "pending",
    processedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const items = products.map((product) => ({
    order_id: order.id,
    product_id: product.id, 
    qtd: product.qtd,
  }));
  console.log(items)
  await ProductOrder.bulkCreate(items);
  const newOrder = await getOrderWithProducts(order.id);

  res.status(201).send(newOrder);
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
