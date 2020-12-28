module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define("Profile", {
    bio: DataTypes.STRING,
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return Profile;
};
