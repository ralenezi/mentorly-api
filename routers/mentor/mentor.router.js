import { Mentor, Student, Track } from "../../db/models";
import { disabled, isSignedIn } from "../../middleware/permissions";

import express from "express";

const router = express.Router();

router.get("/");

export default router;
