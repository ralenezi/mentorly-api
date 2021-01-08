import { Student, Track } from "../../db/models";
export const getListOfStudentFromTrack = async (req, res, next) => {
  try {
    const { trackId } = req.params;
    const students = await Student.findAll({
      where: { trackId: trackId },
    });
    res.json(students);
  } catch (error) {
    next(error);
  }
};
