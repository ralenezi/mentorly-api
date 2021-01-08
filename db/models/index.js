"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

/** Connect is a method that connects the database to postgres database
 * @param {function} cb - your call back function such as app.listen or anything you want to happen when the database is connected
 * @param {object} options - alter: true or force true. By default it's `alter: true`
 */

/*
    Profiles and groups relationships 

    User ---> Profile  
                --> Student
                --> Mentor

    Material and lectures

    Material -->> Lecture -->> Track

 */

// User >----< Profile
db.User.hasOne(db.Profile, {
  as: "profile",
  foreignKey: { name: "userId", allowNull: false },
});
db.Profile.belongsTo(db.User, { as: "user", foreignKey: "userId" });

// Students + Mentors
// Profile >-----< Student
db.Profile.hasOne(db.Student, {
  foreignKey: { name: "profileId", allowNull: false },
  as: "student",
});
db.Student.belongsTo(db.Profile, { as: "profile", foreignKey: "profileId" });
// Profile >-----< Mentor
db.Profile.hasOne(db.Mentor, {
  as: "mentor",
  foreignKey: { name: "profileId", allowNull: false },
});
db.Mentor.belongsTo(db.Profile, {
  as: "mentor",
  foreignKey: { name: "profileId", allowNull: false },
});
// Track >-----< Mentor
db.Track.hasMany(db.Mentor, { foreignKey: "trackId", as: "mentors" });
db.Mentor.belongsTo(db.Track, { foreignKey: "trackId", as: "track" });

// Track >-----< Student
db.Track.hasMany(db.Student, { foreignKey: "trackId", as: "students" });
db.Student.belongsTo(db.Track, { foreignKey: "trackId", as: "track" });

// Track >-----< Lecture
db.Track.hasMany(db.Lecture, { foreignKey: "trackId", as: "lectures" });
db.Lecture.belongsTo(db.Track, { foreignKey: "trackId", as: "track" });

// Lecture <------ Material
db.Lecture.hasMany(db.Material, { as: "materials", foreignKey: "lectureId" });
db.Material.belongsTo(db.Lecture, { as: "lecture" });

// Mentor <------ Student
db.Mentor.hasMany(db.Student, { as: "students", foreignKey: "mentorId" });
db.Student.belongsTo(db.Mentor, { as: "mentor" });

// Cohort <------> Track
// db.Track.belongsToMany(db.Cohort, {
//   as: "tracks",
//   foreignKey: "trackId",
//   through: db.CohortTrack,
// });
// db.Cohort.belongsToMany(db.Track, {
//   as: "cohorts",
//   foreignKey: "cohortId",
//   through: db.CohortTrack,
// });

// db.CohortTrack.hasMany(db.Student);
// db.Student.belongsTo(db.CohortTrack);

// Cohort <------> Student

// Cohort <------> Lecture

/*
  Tracks
 1.   ↪ Tasks 
 2.       ↪ Submissions 
 3.            ↪ Student
                         
*/

// 1. Track has many tasks
db.Track.hasMany(db.Task, {
  foreignKey: "trackId",
  as: "tasks",
});
db.Task.belongsTo(db.Track, {
  foreignKey: "trackId",
  as: "track",
});

// 2. Task has many submissions
db.Task.hasMany(db.Submission, {
  foreignKey: { name: "taskId", allowNull: false },
  as: "submissions",
});
db.Submission.belongsTo(db.Task, {
  allowNull: false,
  foreignKey: "taskId",
  as: "task",
});

//3 . Student has multiple submissions. a submission belongs to one student
db.Student.hasMany(db.Submission, {
  foreignKey: { name: "studentId", allowNull: false },
  as: "submissions",
});
db.Submission.belongsTo(db.Student, {
  foreignKey: "studentId",
  as: "student",
});

module.exports = db;
