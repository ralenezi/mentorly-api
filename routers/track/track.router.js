import CrudController from "../../crud/crud.controller";
import CrudRouter from "../../crud/crud.router";
import { Track } from "../../db/models";
import express from "express";

const router = express.Router();
const controller = new CrudController(Track, "track");
const routers = new CrudRouter(controller);
router.use(routers);

export default router;
