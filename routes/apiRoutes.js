var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new inventory
  app.post("/api/inventory", function(req, res) {
    db.inventory.create(req.body).then(function(dbInventory) {
      res.json(dbInventory);
    });
  });

  // Create a new task
  app.post("/api/task", function(req, res) {
    db.task.create(req.body).then(function(dbTask) {
      res.json(dbTask);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
