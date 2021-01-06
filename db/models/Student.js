module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define("Student", {
    fullName: DataTypes.STRING,
    bio: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: DataTypes.STRING,
    email: DataTypes.STRING,
    github: DataTypes.STRING,
  });

  return Student;
};
