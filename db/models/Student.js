module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define("Student", {
    grade: DataTypes.STRING,
    schoolName: DataTypes.STRING,
    schoolType: DataTypes.STRING,
    device: DataTypes.STRING,
  });

  return Student;
};
