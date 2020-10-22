var db = require("../models");

module.exports = function(app) {
  // Get all inventory
  // Add where clause to compare the quantity field with the Replenish flag
  app.get("/api/inventory", function(req, res) {
    db.inventory.findAll({}).then(function(dbGetInventory) {
      res.json(dbGetInventory);
    });
  });
  // Create a new inventory
  app.post("/api/inventory", function(req, res) {
    db.inventory.create(req.body).then(function(dbInventory) {
      res.json(dbInventory);
    });
  });

  //Update item from inventory request
  app.put("/api/inventory/:id", function(req, res) {
    db.inventory
      .update(
        {
          categoryName: req.body.categoryName,
          itemName: req.body.itemName,
          quantity: req.body.quantity,
          replenishFlag: req.body.replenishFlag,
          price: req.body.price,
          supplierName: req.body.supplierName
        },
        {
          where: {
            id: req.params.id
          }
        }
      )
      .then(function(dbInventory) {
        res.json(dbInventory);
      });
  });
  // Get all Listdetails
  app.get("/api/listdetails", function(req, res) {
    db.listdetails.findAll({}).then(function(dbGetlistdetails) {
      res.json(dbGetlistdetails);
    });
  });
  // Create/Post a new Listdetails
  app.post("/api/listdetails", function(req, res) {
    db.listdetails.create(req.body).then(function(dbListdetails) {
      res.json(dbListdetails);
    });
  });

  //Update item from Listdetails request
  app.put("/api/listdetails/:idItem", function(req, res) {
    console.log(req.params);
    db.listdetails
      .update(
        {
          quantityObtained: req.body.quantityObtained,
          status: req.body.status
        },
        {
          where: {
            idItem: req.params.idItem
          }
        }
      )
      .then(function(dbListdetails) {
        res.json(dbListdetails);
      });
  });
};
