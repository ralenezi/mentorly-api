import { Task, Track } from "../../db/models";

// This should show tasks for cohort_track
export const getTasksForTrack = async (req, res, next) => {
  try {
    const { trackId } = req.params;
    const tasks = await Task.findAll({
      where: { trackId: trackId },
    });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};
