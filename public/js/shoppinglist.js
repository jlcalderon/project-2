$(document).ready(function() {

    /******************** UPDATING ELEMENTS DETAILS ON THE LIST ***********************/
    $(document).on("change", ".update-control", function(event) {
        event.preventDefault();
        //if the update-control is checked
        if ($(this).is(':checked')) {

            //Grab data from inputs in variables
            let inventoryId = $(this).data("id");

            //Make an object out of the variables
            let updateItem = {
                categoryName: $(this).data("category"),
                itemName: $(this).data("name"),
                quantity: parseInt($(`#${inventoryId}-quantityObtained`).val(), 10),
                replenishFlag: parseInt($(this).data("replenish"), 10),
                price: parseFloat($(this).data("price")),
                supplierName: $(this).data("supplier")
            }

            //Request to Update the status of the item on the shopping list
            $.ajax({
                url: "/api/listdetails/" + inventoryId,
                method: "PUT",
                data: { quantityObtained: updateItem.quantity, status: $(this).is(':checked') },
            }).then(function(resp) {
                console.log(resp);
            });

        } else { //Otherwise put obtained 0 and status on list to false
            //Grab data from inputs in variables
            let inventoryId = $(this).data("id");

            //Change value on list back to 0 when uncheck
            $(`#${inventoryId}-quantityObtained`).val(0);

            //Make an object out of the variables
            let updateItem = {
                categoryName: $(this).data("category"),
                itemName: $(this).data("name"),
                quantity: 0,
                replenishFlag: parseInt($(this).data("replenish"), 10),
                price: parseFloat($(this).data("price")),
                supplierName: $(this).data("supplier")
            }

            //Request to Update the status of the item on the shopping list
            $.ajax({
                url: "/api/listdetails/" + inventoryId,
                method: "PUT",
                data: { quantityObtained: updateItem.quantity, status: $(this).is(':checked') },
            });
        }

    });

    /**************** UPDATE THE SHOPPING LIST AS COMPLETE *****************/

    /* Grab input elements values of the correct shoppinglist */
    $(document).on("click", ".complete-list", function(event) {
        event.preventDefault();
        let shoppinglistId = $(this).data("id");

        /*************** UPDATING INVENTORY WHEN COMPLETE ***************/
        $(`input[data-parent=${shoppinglistId}]`).each(function() {

            let inventoryId = $(this).data("id");

            //Make an object out of each input data-parent iteration 
            let updateItem = {
                categoryName: $(this).data("category"),
                itemName: $(this).data("name"),
                quantity: parseInt($(this).val(), 10), //Quantity of the input
                replenishFlag: parseInt($(this).data("replenish"), 10),
                price: parseFloat($(this).data("price")),
                supplierName: $(this).data("supplier")
            }
            console.log(JSON.stringify(updateItem));
            //Run an Ajax put request for all items on the list to update inventory
            $.ajax({
                url: "/api/inventory/" + inventoryId,
                method: "PUT",
                data: updateItem,
            });
        });

        /* Change status of shoppinglist to completed */
        $.ajax({
            url: "/api/shoppinglist/id/" + shoppinglistId,
            method: "PUT",
            data: { completeTask: true },
        }).then(function() {
            location.reload();
        });
    });



});