module.exports = (sequelize, DataTypes) => {
  const Lecture = sequelize.define('Lecture', {
    title: { type: DataTypes.STRING, allowNull: false },
    startDate: DataTypes.DATEONLY,
    endDate: DataTypes.DATEONLY,
  })

  return Lecture
}
