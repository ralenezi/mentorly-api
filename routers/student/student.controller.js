import { Profile, Student, Task, Track, User } from "../../db/models";

export const getStudentProgress = async (req, res, next) => {
  try {
    const studentId = req.params.studentId;
    const student = await Student.findByPk(studentId, {
      attributes: { exclude: ["updatedAt", "createdAt"] },
      //   raw: true,
      include: [
        {
          model: Profile,
          as: "profile",
          attributes: ["name", "image", "bio", "enrolled"],

          include: [
            {
              model: User,
              as: "user",
              attributes: ["email"],
            },
          ],
        },
      ],
    });

    const tasks = await Task.findAll({
      where: {
        trackId: student.trackId,
      },
      include: {
        required: false,
        model: Student,
        attributes: ["id"],
        where: {
          id: studentId,
        },
      },
    });
    let studentJSON = JSON.parse(JSON.stringify(student));
    let tasksJSON = JSON.parse(JSON.stringify(tasks));
    tasksJSON.forEach((task) => {
      task.submission = task.Students[0]?.Submission;
      delete task.Students;
    });
    // res.json(tasksJSON);
    let weight = totalWeight(tasksJSON);
    let requiredWeight = totalRequiredWeight(tasksJSON);
    let scoresWeighted = weightedScores(tasksJSON);
    let requiredScore = totalRequiredScore(tasksJSON);
    let theTotalScore = totalScore(tasksJSON);
    let studentsAverageGrade = theTotalScore / requiredWeight;

    console.log({
      requiredScore,
      theTotalScore,
      studentsAverageGrade,
      requiredWeight,
      scoresWeighted,
    });
    let progress = {
      average: studentsAverageGrade,
      tasks: scoresWeighted,
    };

    delete studentJSON.Tasks;

    res.json({ ...studentJSON, progress });
  } catch (error) {
    next(error);
  }
};
// TODO: THIS SHOULD RETURN AN ARRAY OF STUDENTS TASKS
// YOU WILL HAVE TO ZIP TRACK TO STUDENTS
export const getStudentsProgress = async (req, res, next) => {
  try {
    const studentId = req.params.trackId;
    const student = await Student.findAll({
      where: { trackId },
      attributes: { exclude: ["updatedAt", "createdAt"] },
      //   raw: true,
      include: [
        {
          model: Profile,
          as: "profile",
          attributes: ["name", "image", "bio", "enrolled"],

          include: [
            {
              model: User,
              as: "user",
              attributes: ["email"],
            },
          ],
        },
      ],
    });

    const tasks = await Task.findAll({
      where: {
        trackId: trackId,
      },
      include: {
        required: false,
        model: Student,
        attributes: ["id"],
      },
    });

    let studentJSON = JSON.parse(JSON.stringify(student));
    let tasksJSON = JSON.parse(JSON.stringify(tasks));
    tasksJSON.forEach((task) => {
      task.submission = task.Students[0]?.Submission;
      delete task.Students;
    });
    // res.json(tasksJSON);
    let weight = totalWeight(tasksJSON);
    let requiredWeight = totalRequiredWeight(tasksJSON);
    let scoresWeighted = weightedScores(tasksJSON);
    let requiredScore = totalRequiredScore(tasksJSON);
    let theTotalScore = totalScore(tasksJSON);
    let studentsAverageGrade = theTotalScore / requiredWeight;

    console.log({
      requiredScore,
      theTotalScore,
      studentsAverageGrade,
      requiredWeight,
      scoresWeighted,
    });
    let progress = {
      average: studentsAverageGrade,
      tasks: scoresWeighted,
    };

    delete studentJSON.Tasks;

    res.json({ ...studentJSON, progress });
  } catch (error) {
    next(error);
  }
};

const totalWeight = (studentTasks) =>
  studentTasks.reduce((acc, current) => {
    return acc + current.weight;
  }, 0);

const totalScore = (studentTasks) =>
  studentTasks.reduce((acc, current) => {
    return acc + (current.submission?.score ?? 0);
  }, 0);

const totalRequiredWeight = (studentTasks) =>
  studentTasks.reduce((acc, current) => {
    return Number(acc) + (current.required ? Number(current.weight) : 0);
  }, 0);

const totalRequiredScore = (studentTasks) =>
  studentTasks.reduce((acc, current) => {
    let total =
      Number(acc) +
      (current.required ? Number(current.submission?.score ?? 0) : 0);
    return Number(total);
  }, 0);

const weightedScores = (studentTasks) =>
  studentTasks.map((task) => {
    const weight = task.weight;
    const score = task.submission?.score ?? 0;
    const total = score / weight;
    task.calculatedScore = total;
    return task;
  });
