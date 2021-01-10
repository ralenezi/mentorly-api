import { Submission } from "../../db/models";

// This amazing middleware makes a single `post` request to create
// if there is no submission already created, or updates and existing one

export const updateSubmissionIfExists = async (req, res, next) => {
  try {
    const { taskId, studentId } = req.body;
    const submission = await Submission.findOne({
      where: {
        taskId,
        studentId,
      },
    });
    if (submission) {
      await submission.update(req.body);
      res.status(202).json({ message: "Updated!", payload: submission });
    } else {
      const newSubmission = await Submission.create(req.body);
      res.status(201).json(newSubmission);
    }
  } catch (error) {
    next(error);
  }
};
