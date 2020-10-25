$(document).ready(function() {

    //*************************Add new Item to Inventory*************************//
    //Grab elements from DOM in variables
    const newItemForm = $(".add-inventory-form");
    const itemName = $("#item-name");
    const itemCategory = $("#item-category");
    const itemQuantity = $("#item-quantity");
    const itemReplenish = $("#item-replenish");
    const itemPrice = $("#item-price");
    const itemSupplier = $("#item-supplier");

    //Triggers the submit form event
    newItemForm.on("submit", function(event) {
        event.preventDefault();
        //Fix bug of selected category name to grab thext from it

        //Create a JSON object from users input
        //Not trimming values because there are some descriptions that are more than one word, it cant be trimmed
        let newItem = {
            itemName: itemName.val(),
            categoryName: itemCategory.val(),
            quantity: parseInt(itemQuantity.val(), 10),
            replenishFlag: parseInt(itemReplenish.val(), 10),
            price: parseFloat(itemPrice.val()),
            supplierName: itemSupplier.val()
        }

        //No need to validate empty inputs because the "required" attribute is set up in the input's form on handlebars

        //Call function to POST
        postNewItem(newItem);
        /* Clean the form input fields */
        /* itemName.val("");
        itemCategory.val("Cleaning Supply");
        itemQuantity.val(0);
        itemReplenish.val(0);
        itemPrice.val(0.00);
        itemSupplier.val(""); */
    });

    function postNewItem(itemObj) {
        //Ajax request to POST the new item to insert new record in our inventories table
        console.log("making post");
        $.ajax({
            url: "/api/inventory",
            method: "POST",
            data: itemObj,
        }).then(function(data) {
            /* if succes here is next step */
            /* do console log to see input record */
            console.log(`new item added to our inventory: ${data}`);
            /* Reload the page */
            location.reload();
        }).catch(function(err) {
            /* if error in the request here throw the error */
            throw err;
        });
    }
    //**************************Update Items from Inventory ******************************/
    //When user with admin privileges click on update button
    $(".update-item").on("click", function(event) {
        event.preventDefault();
        // Grabbing id of item clicked
        let itemId = $(this).data("id");

        //Create a JSON object from users input
        //Not trimming values because there are some descriptions that are more than one word, it cant be trimmed
        let updatedItem = {
            categoryName: $(`#${itemId}-category`).val(),
            itemName: $(`#${itemId}-name`).val(),
            quantity: parseInt($(`#${itemId}-quantity`).val(), 10),
            replenishFlag: parseInt($(`#${itemId}-replenish`).val(), 10),
            price: parseFloat($(`#${itemId}-price`).val()),
            supplierName: $(`#${itemId}-supplier`).val()
        }

        // Call in the function that updates our inventory item and pass on our object
        updateItem(updatedItem);

        function updateItem(itemObj) {
            // Perform an Ajax request
            console.log("Making PUT request");

            $.ajax({
                url: "api/inventory/" + itemId,
                method: "PUT",
                data: itemObj,
            }).then(function(data) {
                /* if succes here is next step */
                /* do console log to see input record */
                console.log(`updated item in inventory`);
                /* Reload the page */
                location.reload();
            }).catch(function(err) {
                /* if error throw the error */
                throw err;
            });
        }
    });



    /************* */

});