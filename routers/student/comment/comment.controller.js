import { Comment } from "../../../db/models";

export const listNotes = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const note = await Comment.findAll({
      where: {
        studentId,
      },
    });
    res.json(note);
  } catch (error) {
    next(error);
  }
};
