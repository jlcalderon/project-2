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

  // Find items running low on inventory
  app.get("/api/inventory/low", function(req, res) {
    db.inventory
      .findAll({
        where: {
          quantity: req.body.quantity <= req.body.replenishFlag
        }
      })
      .then(function(dbGetInventoryLow) {
        res.json(dbGetInventoryLow);
      });
  });

  // Get all shoppinglist
  app.get("/api/shoppinglist", function(req, res) {
    db.shoppinglist.findAll({}).then(function(dbGetshoppinglist) {
      res.json(dbGetshoppinglist);
    });
  });

  // Create/Post a new shoppinglist
  app.post("/api/shoppinglist", function(req, res) {
    db.shoppinglist.create(req.body).then(function(dbshoppinglist) {
      res.json(dbshoppinglist);
    });
  });

  //Update item from shoppinglist request
  app.put("/api/shoppinglist/:id", function(req, res) {
    db.shoppinglist
      .update(
        {
          idUser: req.body.idUser,
          listName: req.body.listName,
          completeTask: req.body.completeTask
        },
        {
          where: {
            id: req.params.id
          }
        }
      )
      .then(function(dbshoppinglist) {
        res.json(dbshoppinglist);
      });
  });

  // Get all user
  app.get("/api/user", function(req, res) {
    db.user.findAll({}).then(function(dbGetuser) {
      res.json(dbGetuser);
    });
  });

  // Create/Post a new user
  app.post("/api/user", function(req, res) {
    db.user.create(req.body).then(function(dbuser) {
      res.json(dbuser);
    });
  });
};
