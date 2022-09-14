// Storage Controller

// Item Controller
const ItemCtrl = (function () {
  // Item construtor
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // Data structure
  const data = {
    items: [
      //   {
      //     id: 0,
      //     name: "Steak Dinner",
      //     calories: 1200,
      //   },
      //   { id: 1, name: "Cookie", calories: 400 },
      //   { id: 2, name: "Eggs", calories: 300 },
    ],
    currentItem: null,
    totalCalories: 0,
  };

  return {
    getItems: function () {
      return data.items;
    },
    addItem: function (name, calories) {
      let ID;
      // Create ID
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }
      // Calories to number
      calories = parseInt(calories);

      // Create new item
      newItem = new Item(ID, name, calories);

      // Add to items array
      data.items.push(newItem);

      return newItem;
    },

    getItemById: function (id) {
      let found = null;
      data.items.forEach(function (item) {
        if (item.id === id) {
          found = item;
        }
      });
      return found;
    },

    updateItem: function (name, calories) {
      // calories to number
      calories = pareseInt(calories);

      let found = null;
      data.items.forEach(function (item) {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });
      return found;
    },

    deleteItem: function (id) {
      // get id
      ids = data.items.map(function (item) {
        return item.id;
      });

      // get index
      const index = ids.indexOf(id);

      //remove item
      data.items.slice(index, 1);
    },

    clearAllItems: function () {
      data.items = [];
    },

    updateItem: function (name, calories) {
      // Calories to number
      calories = parseInt(calories);

      let found = null;

      data.items.forEach(function (item) {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });
      return found;
    },

    getTotalCalories: function () {
      let total = 0;
      data.items.forEach(function (item) {
        total += item.calories;
      });
      data.totalCalories = total;
      return data.totalCalories;
    },

    setCurrentItem: function (item) {
      data.currentItem = item;
    },

    getCurrentItem: function () {
      return data.currentItem;
    },

    logData: function () {
      return data;
    },
  };
})();

// UI Controller
const UICtrl = (function () {
  const UISelectors = {
    itemList: "#item-list",
    listItems: "#item-list li",
    addBtn: ".add-btn",
    updateBtn: ".update-btn",
    editBtn: ".edit-btn",
    deleteBtn: ".delete-btn",
    clearBtn: ".clear-btn",
    backBtn: ".back-btn",
    itemNameInput: "#item-name",
    itemCaloriesInput: "#item-calories",
    totalCalories: ".total-calories",
  };
  return {
    populateItemList: function (items) {
      let html = "";

      items.forEach(function (item) {
        html += `<li class='collection-item' id="item-${item.id}">
        <strong> ${item.name}:</strong><em>${item.calories} Calories</em> <a href="#" claas="secondary-content"><i class="edit-item fa fa-pencil"></i></a></li>`;
      });
      // Insert items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },

    getItemInput: function () {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value,
      };
    },

    addListItem: function (item) {
      // Show the list
      document.querySelector(UISelectors.itemList).style.display = "block";
      // Create li element
      const li = document.createElement("li");
      // Add class
      li.className = "collection-item";
      // Add ID
      li.id = `item-${item.id}`;
      // Add HTML
      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>`;
      // Insert item
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement("beforeend", li);
    },

    deleteListItem: function (id) {
      const itemID = `item-${id}`;
      const item = socument.querySelector(itemID);
      item.remove();
    },

    removeItems: function () {
      let listItems = documnet.querySelector(UISelectors.listItems);

      // turn node-list into array
      listItems = Array.from(listItems);
      listItems.forEach(function (item) {
        item.remove;
      });
    },

    clearInput: function () {
      document.querySelector(UISelectors.itemNameInput).value = "";
      document.querySelector(UISelectors.itemCaloriesInput).value = "";
    },

    addItemToForm: function () {
      document.querySelector(UISelectors.itemNameInput).value =
        ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value =
        ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },
    hideList: function () {
      document.querySelector(UISelectors.itemList).style.display = "none";
    },

    showTotalCalories: function (total) {
      document.querySelector(UISelectors.totalCalories).textContent = total;
    },
    showEditState: function () {
      document.querySelector(UISelectors.updateBtn).style.display = "inline";
      document.querySelector(UISelectors.deleteBtn).style.display = "inline";
      document.querySelector(UISelectors.backBtn).style.display = "inline";
      document.querySelector(UISelectors.addBtn).style.display = "none";
    },

    updateListItem: function (item) {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // Turn Node list into array
      listItems = Array.from(listItems);

      listItems.forEach(function (listItem) {
        const itemID = listItem.getAttribute("id");

        if (itemID === `item-${item.id}`) {
          document.querySelector(
            `#${itemID}`
          ).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>`;
        }
      });
    },

    clearEditState: function () {
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = "none";
      document.querySelector(UISelectors.deleteBtn).style.display = "none";
      document.querySelector(UISelectors.backBtn).style.display = "none";
      document.querySelector(UISelectors.addBtn).style.display = "inline";
    },

    getSelectors: function () {
      return UISelectors;
    },
  };
})();

//App Controller
const App = (function (ItemCtrl, UICtrl) {
  // load event listeners
  const loadEventListeners = function () {
    const UISelectors = UICtrl.getSelectors();

    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);

    // disable submit on enter
    document.addEventListener("keypress", function (e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });

    //edit icon click event
    document
      .querySelector(UISelectors.itemList)
      .addEventListener("click", itemEditClick);

    document
      .querySelector(UISelectors.updateBtn)
      .addEventListener("click", itemUpdateSubmit);

    document
      .querySelector(UISelectors.deleteBtn)
      .addEventListener("click", itemDeleteSubmit);

    document
      .querySelector(UISelectors.backBtn)
      .addEventListener("click", UICtrl.clearEditState);

    document
      .querySelector(UISelectors.clearBtn)
      .addEventListener("click", clearAllItemsClear);
  };

  // update item submit
  const itemUpdateSubmit = function (e) {
    // Get item input
    const input = UICtrl.getItemInput();

    // Update item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

    // Update UI
    UICtrl.updateListItem(updatedItem);

    // total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // add total to UI
    UICtrl.showTotalCalories(totalCalories);
    UICtrl.clearEditState();

    e.preventDefault();
  };

  const itemAddSubmit = function (e) {
    const input = UICtrl.getItemInput();

    console.log(input);
    // console.log("submited");

    if (input.name !== "" && input.calories !== "") {
      // Add item
      const newItem = ItemCtrl.addItem(input.name, input.calories);

      // Add item to UI list
      UICtrl.addListItem(newItem);

      // total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      // add total to UI
      UICtrl.showTotalCalories(totalCalories);

      // Clear fields
      UICtrl.clearInput();
    }
    // checking
    e.preventDefault();
  };

  const itemEditClick = function (e) {
    if (e.target.classList.contains("edit-item")) {
      // get list item id
      const listId = e.target.parentNode.parentNode.id;
      // get from our 'item-0' only number
      const listIdArr = listId.split("-");
      // get this actual id
      const id = parseInt(listIdArr[1]);
      console.log(listIdArr);

      //get item
      const itemToEdit = ItemCtrl.getItemById(id);

      // set current item
      ItemCtrl.setCurrentItem(itemToEdit);

      // add our currentItem to form
      UICtrl.addItemToForm();

      console.log(itemToEdit);
    }

    e.preventDefault();
  };

  // DELETE btn event

  const itemDeleteSubmit = function (e) {
    // get current item
    const currentItem = ItemCtrl.getCurrentItem();

    // delete from data structure
    ItemCtrl.deleteItem(currentItem.id);

    // delete from ui
    UICtrl.deleteListItem(currentItem.id);

    // total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // add total to UI
    UICtrl.showTotalCalories(totalCalories);
    UICtrl.clearEditState();

    e.preventDefault();
  };

  // clear items event

  const clearAllItemsClear = function () {
    // delete all from data structure
    ItemCtrl.clearAllItems();

    // total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // add total to UI
    UICtrl.showTotalCalories(totalCalories);

    // remove from UI
    UICtrl.removeItems();

    // hide UL
    UICtrl.hideList();
  };

  return {
    init: function () {
      // clear edit state
      UICtrl.clearEditState();

      // Fetch items from data structure
      const items = ItemCtrl.getItems();

      // Check if any items
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        // Populate list with items
        UICtrl.populateItemList(items);
      }

      // total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      // add total to UI
      UICtrl.showTotalCalories(totalCalories);

      loadEventListeners();
    },
  };
})(ItemCtrl, UICtrl);

App.init();
