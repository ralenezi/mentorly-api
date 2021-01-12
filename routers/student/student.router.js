import { Mentor, Student, Track } from "../../db/models";
import { disabled, isSignedIn } from "../../middleware/permissions";
import commentRouter from "./comment/comment.router";

import express from "express";
import { getStudentProgress } from "./student.controller";
import { injectUpdatedBy } from "./comment/comment.middleware";

const router = express.Router();

router.get("/:studentId/", getStudentProgress);
router.post("/:studentId/comments", injectUpdatedBy);
router.use(commentRouter);

export default router;
