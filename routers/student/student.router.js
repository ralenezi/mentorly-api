import { Mentor, Student, Track } from "../../db/models";
import { disabled, isSignedIn } from "../../middleware/permissions";

import express from "express";
import { getStudentProgress } from "./student.controller";

const router = express.Router();

router.get("/:studentId/", getStudentProgress);

export default router;
