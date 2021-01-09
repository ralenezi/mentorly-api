module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
    title: DataTypes.STRING,
    dueDate: DataTypes.DATEONLY,
  });

  return Task;
};
