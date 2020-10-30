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

    /* Grab the selected list */
    var listSelected;

    /** Grab all inventory in an array of objects */
    var inventory = [];

    $.ajax({
        url: "/api/inventory",
        method: "GET",
    }).then(function(items) {
        items.forEach(itm => {
            inventory.push(itm);
        });
    });

    console.log(inventory);


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



    /************************** Shopping List ***********************/
    /* Get request to get the users in the dropdown of shopping list */
    $.ajax({
        url: "api/users",
        method: "GET",
    }).then(function(result) {
        //Populate the dropwon with all the users
        result.forEach(user => {
            $("#shopping-list-user").append(`<option value="${user.id}">${user.userName}</option>`);
        });
    }).catch(function(err) {
        /* if error throw it */
        throw err;
    });

    /* Get request to get the shoppinglists on the side */
    $.ajax({
        url: "api/shoppinglist",
        method: "GET",
    }).then(function(result) {
        //Populate the shoppinglists that we have
        result.forEach(list => {
            if (!list.completeTask) {
                $("#shoppingListsUl").append(`<li class="list-group-item shopList" data-id="${list.id}" data-responsible="${list.idUser}" data-completeded="${list.completeTask}">${list.listName}</li>`);
            }
        });
    }).catch(function(err) {
        /* if error throw it */
        throw err;
    });

    /* when form shopping list submitted */
    /* ajax post request to save the new shopping list */
    $(".new-shoppoing-list").on("submit", function(event) {
        event.preventDefault();

        /* Create newListObj from user's input in the shopping list form */
        let newListObj = {
            listName: $("#shopping-list-name").val(),
            userId: parseInt($("#shopping-list-user").val(), 10),
            completeTask: false
        }

        $.ajax({
            url: "/api/shoppinglist",
            method: "POST",
            data: newListObj,
        }).then(function() {
            //Render the shoppinglists on the side by refreshing the page
            location.reload();
        }).catch(function(err) {
            throw err;
        });
    });

    /* When a list is selected */
    $(document).on("click", ".shopList", function(event) {
        event.preventDefault();
        //Grab the clicked ID in the global variable of list selected
        listSelected = $(this).data("id");
        console.log(listSelected);

        //Display a hint on the UI to let user know what list is selected
        $(this).addClass("selected");

        //Perform an ajax request GET of list details with list id = listSelected
        $.ajax({
            url: "/api/listdetails/" + listSelected,
            method: "GET",
        }).then(function(shoppingListDetails) {
            /* Creates a ul to put the items of this list togther */
            let ulDetails = $("<ul>");
            ulDetails.addClass("list-group");
            var detailsArray = [];
            shoppingListDetails.forEach(details => {
                /*Grab the responses and create list details <li>*/
                detailsArray.push(
                    $("<li class='list-group-item'>")
                    .text(details.inventory.itemName + "            " + details.inventory.price + "             " + details.inventory.supplierName + " Count inventory: " + details.inventory.quantity)
                );
            });
            ulDetails.append(detailsArray);
            $("#selectedShoppingList").html("");
            $("#selectedShoppingList").append(ulDetails);

        }).catch(function(err) {
            throw err;
        });

        //Enable a button on the side to inventory to add item to the selected list
        $(".add-to-list").removeAttr("disabled");


    });

    $(".add-to-list").on("click", function(event) {
        event.preventDefault();

        //Grab the item id by data-id
        let itemId = $(this).data("id");

        //Ajax request to add a new item on the shopping list
        $.ajax({
            url: "/api/listdetails",
            method: "POST",
            data: { shoppinglistId: listSelected, inventoryId: itemId, quantityObtained: 0, status: false },
        }).then(function(result) {
            console.log("item added to the list:" + JSON.stringify(result));
        }).catch(function(err) {
            throw err;
        });

    });

});