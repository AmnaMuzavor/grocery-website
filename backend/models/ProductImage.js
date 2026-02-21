module.exports = (sequelize, DataTypes) => {
  const ProductImage = sequelize.define("ProductImage", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: "product_images",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  });

  ProductImage.associate = (models) => {
    ProductImage.belongsTo(models.Product, {
      foreignKey: "product_id"
    });
  };

  return ProductImage;
};
