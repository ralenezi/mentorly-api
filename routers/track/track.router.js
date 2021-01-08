import CrudController from "../../crud/crud.controller";
import CrudRouter from "../../crud/crud.router";
import { Track } from "../../db/models";
import { disabled } from "../../middleware/permissions";
import express from "express";

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

export default router;
