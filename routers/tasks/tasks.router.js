import { Mentor, Student, Track } from "../../db/models";
import { disabled, isSignedIn } from "../../middleware/permissions";

import express from "express";
import { getTasksForTrack } from "./tasks.controller";

const router = express.Router();

router.get("/:trackId/tasks", getTasksForTrack);

export default router;
