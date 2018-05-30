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
      console.log("Connected as id: " + connection.threadId)
     order()
  })

function Option(name, price, stock, id) {
this.name = name
this.price = price
this.stock = stock
this.id = id
}


function order() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        // console.log(results)
        inquirer.prompt([{
            name: "choice",
            type: "rawlist",
            choices: function() {
                var choiceArray = []
                console.log("-------------------------------------------------------------------")
                console.log("                  All items are 1000 round boxes")
                console.log("-------------------------------------------------------------------")

                for (var i = 0; i < results.length; i++) {
                    // choiceArray.push(results[i].product_name + " price: $" + results[i].price+  " Item ID: " + results[i].item_id)
                    var choice = new Option(results[i].product_name, results[i].price, results[i].stock_quantity, results[i].item_id)
                    choiceArray.push(choice)
                    console.table("Item ID: " + choiceArray[i].id + " "  + choiceArray[i].name + " Ammunition " + " Price: $" + choiceArray[i].price + " Stock: "+ choiceArray[i].stock)

                }
                console.log("-------------------------------------------------------------------")
                return choiceArray
            },
            message: "What would you like to buy?"
            },
            {
            name: "amount",
            type: "input",
            message: "How many boxes would you like to buy?"
            },
        ])
        .then(function(answer) {
            // console.log(answer.choice)
            // console.log(answer.amount)
            // console.log(results)
            var chosenItem
            for (var x = 0; x < results.length; x++) {
                if (results[x].product_name === answer.choice) {
                    chosenItem = results[x];
                    // console.log(chosenItem)
                }
            }
            if(answer.amount > chosenItem.stock_quantity){
                console.log("-------------------------------------------------------------------")
                console.log("         ***** Insufficient stock, please try again. *****")
                console.log("-------------------------------------------------------------------")


                order()
            }
            else {
                var updatedStock = (chosenItem.stock_quantity - answer.amount)
                // console.log(chosenItem.item_id)
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [{
                        stock_quantity: updatedStock
                    },
                    {
                       item_id: chosenItem.item_id
                    }
                    ]
                )
                console.log("Order Complete!")
                newOrder()
            }
        })
    })
}
function newOrder() {
    inquirer.prompt([
        {
            type: "confirm",
            message: "Would you like to place another order?",
            name: "confirm",
            default: true
        }
    ])
    .then(function(response) {
        if (response.confirm === true) {
            order()
        }
        else {
            console.log("Thank you for shopping with BAMAZON!")
        }
    })
}


// function checkStock(z) {
//     if(answer.amount < chosenItem.stock_quantity){
//         console.log("Insufficient quantity, please try again.")
//     }
//     else {

//     }
// }