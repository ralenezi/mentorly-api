import { Mentor, Student, Track } from "../../db/models";
import { disabled, isMentor, isSignedIn } from "../../middleware/permissions";
import commentRouter from "./comment/comment.router";

import express from "express";
import { getStudentProgress } from "./student.controller";
import { injectUpdatedBy } from "./comment/comment.middleware";

const router = express.Router();

// router.post("/:studentId", injectUpdatedBy);
router.get("/:studentId/", getStudentProgress);
router.use(
  "/:studentId/comments",
  isSignedIn,
  isMentor,
  injectUpdatedBy,
  commentRouter
);
// router.use(commentRouter);

export default router;
