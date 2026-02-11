module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define("Address", {
    address_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address_line: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    pincode: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: "addresses",
    timestamps: false
  });

  Address.associate = (models) => {
    Address.belongsTo(models.Users, { foreignKey: "user_id" });
  };

  return Address;
};
