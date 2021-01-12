import { Comment } from "../../../db/models";
import {
  disabled,
  isSignedIn,
  isMentor,
} from "../../../middleware/permissions";
import CrudController from "../../../crud/crud.controller";
import CrudRouter from "../../../crud/crud.router";
import express from "express";
import { listNotes } from "./comment.controller";
import { injectUpdatedBy } from "./comment.middleware";

const router = express.Router();
router.use(
  "00/:studentId/comments",
  new CrudRouter(new CrudController(Comment, "Comment"), {
    updateMW: [disabled],
    createMW: [isSignedIn, isMentor, injectUpdatedBy],
    destroyMW: [isSignedIn, isMentor],
    listMW: [isSignedIn, isMentor, listNotes],
  })
);

export default router;
