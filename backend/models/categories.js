module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    image_url: {
      type: DataTypes.STRING(255)
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: "categories",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false
  });

  Category.associate = (models) => {
    Category.hasMany(models.Product, {
      foreignKey: "category_id",
      onDelete: "CASCADE"
    });
  };

  return Category;
};
