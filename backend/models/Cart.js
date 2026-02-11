module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define("Cart", {
    cart_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false
    },
    products: {
      type: DataTypes.JSON,   
      allowNull: false,
      defaultValue: []
    }
  }, {
    tableName: "carts",
    timestamps: false
  });

  Cart.associate = (models) => {
    Cart.belongsTo(models.Users, { foreignKey: "user_id" });
  };

  return Cart;
};
