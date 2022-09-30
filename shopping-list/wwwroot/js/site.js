let currentList = {};

function createShoppingList() {
    currentList.name = $("#shoppingListName").val();
    currentList.items = new Array();

    // web service call

    showShoppingList();    
}

function showShoppingList() {
    $("#shoppingListTitle").html(currentList.name);
    $("#shoppingListItems").empty();

    $("#createListDiv").hide();
    $("#shoppingListDiv").show();

    $("#newItemName").focus();
    
    $("#newItemName").keyup( function (event) {
        if(event.keyCode === 13) {
            addItem();
        }
    });
}

function addItem() {
    let newItem = {};
    newItem.name = $("#newItemName").val();
    currentList.items.push(newItem);

    displayItems();
    $("#newItemName").val("");
}


function displayItems() {
    let $list = $("#shoppingListItems").empty();

    for (let i = 0; i < currentList.items.length; i++) {
        const curreItem = currentList.items[i];
        let $li = $("<li>").html(curreItem.name).attr("id", "item_" + i);

        var $deleteBtn = $("<button onclick='deleteItem(" + i + ")'>D</button>").appendTo($li);
        var $checkBtn = $("<button onclick='checkItem(" + i + ")'>C</button>").appendTo($li);

        $li.appendTo($list);
    }
}

function deleteItem(index) {
    currentList.items.splice(index, 1);
    displayItems();
}

function checkItem(index) { 

    if($("#item_" + index).hasClass("checked")) {
        $("#item_" + index).removeClass("checked");
    } else {
        $("#item_" + index).addClass("checked");
    }

}

function getShoppingListById(id) {
    console.log(id);

    currentList.name = "Mock Shopping List";
    currentList.items = [
        {name: "Milk"},
        {name: "Cornflakes"},
        {name: "Strawberries"},
    ];

    showShoppingList();
    displayItems();
}

$(document).ready(function() {
    console.log("ready");
    $("#shoppingListName").focus();

    $("#shoppingListName").keyup( function (event) {
        if(event.keyCode === 13) {
            createShoppingList();
        }
    });

    let pageUrl = window.location.href;
    let idIndex = pageUrl.indexOf("?id=");

    if(idIndex != -1) {
        getShoppingListById(pageUrl.substring(idIndex + 4));
    }
});