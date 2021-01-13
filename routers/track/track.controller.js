import { Task, User, Student, Profile } from "../../db/models";
export const getListOfStudentFromTrack = async (req, res, next) => {
  try {
    const { trackId } = req.params;
    const students = await Student.findAll({
      where: { trackId: trackId },
      include: [
        {
          model: Profile,
          as: "profile",
          include: {
            model: User,
            as: "user",
            attributes: ["email"],
          },
        },
        Task,
      ],
    });
    res.json(students);
  } catch (error) {
    next(error);
  }
};
