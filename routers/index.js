import CRUDController from "../controllers/CRUDController";
import CRUDRouter from "./CRUDRouter";
import authRouter from "./authentication";
import express from "express";
const { Trip } = require("../db/models");
const routers = express.Router();

routers.use(authRouter);
routers.use("/trips", new CRUDRouter(new CRUDController(Trip, "trip")));
export default routers;
