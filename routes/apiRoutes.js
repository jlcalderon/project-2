var db = require("../models");

module.exports = function(app) {
  // Get all inventory
  // Add where clause to compare the quantity field with the Replenish flag
  app.get("/api/inventory", function(req, res) {
    db.inventory.findAll({}).then(function(dbGetInventory) {
      res.json(dbGetInventory);
    });
  });

  // // Get all task
  // app.get("/api/task", function(req, res) {
  //   db.inventory.findAll({}).then(function(dbGetTask) {
  //     res.json(dbGetTask);
  //   });
  // });

  // Create a new inventory
  app.post("/api/inventory", function(req, res) {
    db.inventory.create(req.body).then(function(dbInventory) {
      res.json(dbInventory);
    });
  });

  // // Create a new task
  // app.post("/api/task", function(req, res) {
  //   db.task.create(req.body).then(function(dbTask) {
  //     res.json(dbTask);
  //   });
  // });

  // // Delete an example by id
  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });
  
   //Update item from inventory request
    app.put("/api/inventory:id", function(req, res) {
        db.inventory.update({
            categoryName: req.body.categoryName,
            itemName: req.body.itemName,
            quantity: req.body.quantity,
            replenishFlag: req.body.replenishFlag,
            price: req.body.price,
            supplierName: req.body.supplierName
        }, {
            where: {
                id: req.params.id
            }
        }).then(function(dbInventory) {
            res.json(dbInventory);
        });
    });
};
