import { disabled, isSignedIn } from "../../middleware/permissions";

import CrudController from "../../crud/crud.controller";
import CrudRouter from "../../crud/crud.router";
import { Submission } from "../../db/models";
import express from "express";

const router = express.Router();

router.get("/:track/submissions");
router.get("/students/:student");

export default router;
