module.exports = (sequelize, DataTypes) => {
  const Lecture = sequelize.define("Lecture", {
    title: { type: DataTypes.STRING, allowNull: false },
    date: DataTypes.DATE,
  });

  return Lecture;
};
