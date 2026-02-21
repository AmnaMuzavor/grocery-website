module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    description: DataTypes.TEXT,
    image_url: DataTypes.STRING(255),
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    discount_price: DataTypes.DECIMAL(10, 2),
    unit: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    stock_quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    is_available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: "products",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  });



  Product.associate = (models) => {
  Product.belongsTo(models.Category, {
    foreignKey: "category_id"
  });

  Product.hasMany(models.ProductImage, {
    foreignKey: "product_id",
    as: "images"
  });
};

  return Product;
};
