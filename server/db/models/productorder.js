'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductOrder extends Model {
    static associate(models) {
      ProductOrder.belongsTo(models.Order)
      ProductOrder.belongsTo(models.Product)
    }
  };
  ProductOrder.init({
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    qtd: DataTypes.INTEGER
  }, {
    sequelize,
    timestamps: false, 
    modelName: 'ProductOrder',
    tableName: 'ProductOrder',
  });
  return ProductOrder;
};