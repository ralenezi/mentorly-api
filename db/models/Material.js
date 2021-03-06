module.exports = (sequelize, DataTypes) => {
  const Material = sequelize.define("Material", {
    title: { type: DataTypes.STRING, allowNull: false },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contentType: DataTypes.STRING,
  });

  return Material;
};
