import { postMiddleware, preMiddleware } from "./middleware";

import app from "./express";
import { connect } from "./db";
import routers from "./routers";

app.use(preMiddleware);
app.use(routers);
app.use(postMiddleware);
connect(async () => {
  app.listen(8185, () => {
    console.log("App is running!");
  });
});
