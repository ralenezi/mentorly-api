const express = require("express");

class CRUDRouter extends express.Router {
  constructor(crudController, options) {
    super();
    this.get("/", options.listMW ?? () => {}, crudController.list);
    this.post("/create", options.createMW, crudController.create);
    this.put("/:id", options.updateMW, crudController.update);
    this.delete("/:id", options.destroyMW, crudController.destory);
  }
}
module.exports = CRUDRouter;
