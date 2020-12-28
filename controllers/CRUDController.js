class CRUDController {
  constructor(ITEM, item, listOptions = {}) {
    this.ITEM = ITEM; // Model used for crud methods
    this.item = item; // String represents the name of the model
    this.listOptions = listOptions;
  }
  // CREATE
  create = async (req, res) => {
    try {
      const newItem = await this.ITEM.create(req.body);
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // UPDATE
  update = async (req, res) => {
    const { id } = req;
    console.log(`Got ${this.item} id:`, id);
    try {
      const foundItem = await this.ITEM.findByPk(id);
      if (foundItem) {
        await foundItem.update(req.body);
        res.status(202).json({ message: "Updated!", payload: foundItem });
      } else {
        res.status(404).json({ message: `${this.item} Not Found` });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // DELETE
  destory = async (req, res) => {
    const { id } = req;
    try {
      const foundItem = await this.ITEM.findByPk(id);
      if (foundItem) {
        await foundItem.destroy();
        res.status(204).end();
      } else {
        res.status(404).json({ message: "Error while deleting" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  // LIST
  list = async (req, res) => {
    try {
      const allItems = await this.ITEM.findAll(this.listOptions);
      res.json(allItems);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

module.exports = CRUDController;
