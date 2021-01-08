import { disabled, isMentor, isSignedIn } from "../../middleware/permissions";

import CrudController from "../../crud/crud.controller";
import CrudRouter from "../../crud/crud.router";
import { Track } from "../../db/models";
import express from "express";
import { getListOfStudentFromTrack } from "./track.controller";
import tasksRouter from "../tasks/tasks.router";

const listOptions = {
  attributes: {
    exclude: ["createdAt", "updatedAt"],
  },
};

const router = express.Router();
const controller = new CrudController(Track, "track", listOptions);
const routers = new CrudRouter(controller, {
  createMW: [disabled],
  updateMW: [disabled],
  destroyMW: [disabled],
});
router.use(routers);
router.get(
  "/:trackId/students",
  isSignedIn,
  isMentor,
  getListOfStudentFromTrack
);
router.use(tasksRouter);
export default router;
