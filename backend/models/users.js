module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM("customer", "admin"),
      defaultValue: "customer"
    },
    is_verified: {
  type: DataTypes.BOOLEAN,
  defaultValue: true
},
verification_token: {
  type: DataTypes.STRING,
   allowNull: true
},
reset_token: {
  type: DataTypes.STRING,
   allowNull: true
},
reset_token_expiry: {
  type: DataTypes.DATE,
   allowNull: true
}
  }, {
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  });

  // Users.associate = (models) => {
  //   Users.hasMany(models.Address, {
  //     foreignKey: "user_id",
  //     onDelete: "CASCADE"
  //   });
  // };
  Users.associate = (models) => {
  Users.hasOne(models.Cart, { foreignKey: "user_id", onDelete: "CASCADE" });
  Users.hasMany(models.Order, { foreignKey: "user_id" });
};


  return Users;
};
