import CRUDController from "../controllers/CRUDController";
import CRUDRouter from "./CRUDRouter";
import adminBroRoute from "./adminBro";
import authRouter from "./authentication";
import express from "express";
import profileRouter from "./profileRouter";
import tripsRouter from "./tripsRouter";
const { Trip } = require("../db/models");
const routers = express.Router();

routers.use(authRouter);
routers.use("/trips", tripsRouter);
routers.use("/profile", profileRouter);
routers.use("/admin", adminBroRoute);
export default routers;
