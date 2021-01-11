module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
    title: DataTypes.STRING,
    dueDate: DataTypes.DATEONLY,
    required: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    weight: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
  });

  return Task;
};
