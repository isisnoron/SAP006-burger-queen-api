'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
     Order.belongsTo(models.User, {
       foreignKey: 'user_id',
     }),
     Order.belongsToMany(models.Product, {
       through: models.ProductOrder,
       foreignKey: 'order_id',
     });
    }
  };
  Order.init({
    client_name: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    table: DataTypes.INTEGER,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
    },
    processedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Date.now(),
    },
  }, {
    sequelize,
    // timestamps: false,
    modelName: 'Order',
    tableName: 'Order',
  });
  return Order;
};
