import { disabled, isMentor, isSignedIn } from "../../middleware/permissions";

import CrudController from "../../crud/crud.controller";
import CrudRouter from "../../crud/crud.router";
import { Submission } from "../../db/models";
import express from "express";
import { injectTaskIdInBody } from "./submission.middleware";

const router = express.Router();

const controllers = new CrudController(Submission, "submission");
const routers = new CrudRouter(controllers, {
  listMW: [disabled],
});
router.use(
  "/submissions",
  isSignedIn,
  isMentor,
  //   injectTaskIdInBody,
  routers
);

export default router;
