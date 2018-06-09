var inquirer = require('inquirer')
var mysql = require('mysql')

var connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bamazon_DB'
  })

  connection.connect(function(err) {
      console.log("Welcome to BAMAZON!")
      manageStore()
  })

function manageStore() {
    inquirer.prompt([{
        name: "choice",
        type: "rawlist",
        choices:["View Products for Sale", "View Low Inventory", "Add Inventory","Add New Product", "Remove Product From Inventory"],
        message: "What do you want to do?"
        }
    ])
    .then(function(response) {
        switch(response.choice) {
            case "View Products for Sale":
                console.log ("Products for Sale")
                viewProducts()
                break
            case "View Low Inventory":
                console.log ("Low Inventory")
                viewLowInventory()
                break

            case "Add Inventory":
                console.log ("Add Inventory")
                addInventory()
                break

            case "Add New Product":
                console.log ("Add New Product")
                addNewItem()
                break
            case "Remove Product From Inventory":
                console.log("Remove Product")
                removeItem()
                break
        }
    })
}

function newTask() {
    inquirer.prompt([
        {
            type: "confirm",
            message: "Would you like to do something else?",
            name: "confirm",
            default: true
        }
    ])
    .then(function(response) {
        if (response.confirm === true) {
            manageStore()
        }
        else {
            console.log("Have a good day!")
        }
    })
}

function viewProducts() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err
        for (var i = 0; i < results.length; i++) {
            console.log("Item ID: " + results[i].item_id + " | "  + results[i].product_name + " | Department: " + results[i].department_name + " | Price: $" + results[i].price + " | Stock: "+ results[i].stock_quantity)
        }
        newTask()
    })
}

function viewLowInventory() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err
        for (var i = 0; i < results.length; i++){
            if(results[i].stock_quantity <= 5) {
                console.log("Item ID: " + results[i].item_id + " | "  + results[i].product_name + " | Department: " + results[i].department_name + " | Price: $" + results[i].price + " | Stock: "+ results[i].stock_quantity)
            }
        }
        newTask()
    })
}

function addInventory() {
    connection.query("SELECT * FROM products", function(err, results) {
        // console.log(results)
        if (err) throw err
        for (var i = 0; i < results.length; i++){
            console.log("Item ID: " + results[i].item_id + " | "  + results[i].product_name + " | Department: " + results[i].department_name + " | Price: $" + results[i].price + " | Stock: "+ results[i].stock_quantity)
        }
        inquirer.prompt([
            {
            name: "item",
            type: "input",
            message: "Enter the item id of what you want to add"
            },
            {
            name: "amount",
            type: "input",
            message: "How many would you like to add?"
            }
        ])
        .then(function(answer) {
            x = (answer.item - 1)// x is used an an index

            // console.log(results[x].stock_quantity)
            var stockUpdate = (parseInt(results[x].stock_quantity) + parseInt(answer.amount))
            // console.log(answer.item)
            // console.log(stockUpdate)
            connection.query(
                "UPDATE products SET ? WHERE ?",
                [{
                    stock_quantity: stockUpdate
                },
                {
                   item_id: answer.item
                }]
            )
            newTask()
        })
    })
}

function addNewItem() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err
        for (var i = 0; i < results.length; i++){
            console.log("Item ID: " + results[i].item_id + " | "  + results[i].product_name + " | Department: " + results[i].department_name + " | Price: $" + results[i].price + " | Stock: "+ results[i].stock_quantity)
        }
        inquirer.prompt([
            {
            name: "item",
            type: "input",
            message: "What item would you like to add"
            },
            {
            name: "department",
            type: "input",
            message: "What department is this sold in?"
            },
            {
            name: "price",
            type: "input",
            message: "How much does this item cost?"
            },
            {
            name: "stock",
            type: "input",
            message: "How many would you like to add?"
            },
        ])
        .then(function(answer) {
            connection.query(
                "INSERT INTO products SET ?",
                [{
                    product_name: answer.item,
                    department_name: answer.department,
                    price: answer.price,
                    stock_quantity: answer.stock
                }]
                
            )
            newTask()
        })
    })
}

function removeItem() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err
        for (var i = 0; i < results.length; i++){
            console.log("Item ID: " + results[i].item_id + " | "  + results[i].product_name + " | Department: " + results[i].department_name + " | Price: $" + results[i].price + " | Stock: "+ results[i].stock_quantity)
        }
        inquirer.prompt([
            {
            name: "id",
            type: "input",
            message: "What product would you like to remove?"
            }
        ])
        .then(function(answer) {
            connection.query(
                "DELETE FROM products WHERE ?",
                {
                    item_id: answer.id
                }
            )
            newTask()
        })
    })
}