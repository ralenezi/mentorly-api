import { connect } from "./db";
import express from "express";
const app = express();

connect(async () => {
  app.listen(8185, () => {
    console.log("App is running!");
  });
});
