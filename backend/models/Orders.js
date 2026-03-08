module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    products: {
      type: DataTypes.JSON,   
      allowNull: false
    },
    total_amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    order_status: {
      type: DataTypes.ENUM("pending","confirmed","delivered","cancelled","return_requested","returned"),
      defaultValue: "pending"
    }
  }, {
    tableName: "orders",
    timestamps: false
  });

  Order.associate = (models) => {
    Order.belongsTo(models.Users, { foreignKey: "user_id" });
    Order.hasOne(models.Payment, { foreignKey: "order_id" });
  };

  return Order;
};
