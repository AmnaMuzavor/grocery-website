
module.exports = (sequelize, DataTypes) => {
  const Wishlist = sequelize.define("Wishlist", {
    wishlist_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: "wishlist",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false
  });

  Wishlist.associate = (models) => {
   
    Wishlist.belongsTo(models.Product, {
      foreignKey: "product_id"
    });

    Wishlist.belongsTo(models.Users, {
      foreignKey: "user_id"
    });
  };

  return Wishlist;
};