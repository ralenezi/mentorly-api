const express = require("express");

class CRUDRouter extends express.Router {
  constructor(crudController, options) {
    super();
    function emptyFun() {}
    this.get("/", options?.listMW ?? emptyFun, crudController.list);
    this.post("/create", options?.createMW ?? emptyFun, crudController.create);
    this.put("/:id", options?.updateMW ?? emptyFun, crudController.update);
    this.delete("/:id", options?.destroyMW ?? emptyFun, crudController.destory);
  }
}
module.exports = CRUDRouter;
