module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define("Payment", {
    payment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "orders",
        key: "order_id"
      },
      onDelete: "CASCADE"
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2)
    },
    payment_method: {
      type: DataTypes.ENUM("UPI", "Card", "COD"),
      allowNull: false
    },
    payment_status: {
      type: DataTypes.ENUM("pending", "success", "failed"),
      defaultValue: "pending"
    }
  }, {
    tableName: "payments",
    timestamps: false
  });

  Payment.associate = (models) => {
    Payment.belongsTo(models.Order, { foreignKey: "order_id" });
  };

  return Payment;
};
