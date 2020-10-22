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
    // Find items running low on inventory
    app.get("/api/inventory/low", function(req, res) {
        db.inventory.findAll({
            where: {
                quantity: req.body.quantity <= req.body.replenishFlag
            }
        }).then(function(dbGetInventoryLow) {
            res.json(dbGetInventoryLow);
        });
    });
    //Update item from inventory request
    app.put("/api/inventory/:id", function(req, res) {
        db.inventory
            .update({
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
            })
            .then(function(dbInventory) {
                res.json(dbInventory);
            });
    });
};