import lectureRouter from './material/lectureRouter'
import materialRouter from './material/materialRouter'
import CRUDController from "../controllers/CRUDController";
import CRUDRouter from "./CRUDRouter";
import adminBroRoute from "./adminBro";
import authRouter from "./authentication";
import express from "express";
import profileRouter from "./profileRouter";
import studentsRouter from "./studentRouter";
const routers = express.Router();

routers.use(authRouter);
routers.use("/profile", profileRouter);
routers.use("/admin", adminBroRoute);
routers.use("/students", studentsRouter);
routers.use("/lectures", lectureRouter)
routers.use("/material", materialRouter)

export default routers
