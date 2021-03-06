var mysql = require("mysql");
var inquirer = require ("inquirer");
var Table = require("cli-table2");

var connection = mysql.createConnection({
  host: "us-cdbr-iron-east-02.cleardb.net",
  user: "bbcb931f5c898e",
  password: "770536e7",
  database: "bamazon",
  port: 3306
});

connection.connect();


var display = function() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log("-------------------------");
    console.log("  Bamazon Welcomes You  ");
    console.log("-------------------------");
    console.log("");
    console.log("You May Find Your Product Below");
    console.log("");
  

  var table = new Table({
    head: ["Product ID", "Product Description", "Cost"],
    colWidths: [12, 30, 8],
    colAligns: ["center", "left", "right"],
    style: {
      head: ["aqua"],
      compact: true
    }
  });
  for (var i = 0; i<res.length; i++) {
    table.push([res[i].id, res[i].products_name, res[i].price]);
  }

  console.log(table.toString());
  console.log("");
  shopping();
});
};

var shopping = function() {
    inquirer
    .prompt({
      name: "productToBuy",
      type: "input",
      message: "Enter the product ID of the item you want to buy."
    })
    .then(function(answer1) {
      var selection = answer1.productToBuy;
      connection.query("SELECT * FROM products WHERE Id=?", selection, function(err, res) {
          if (err) throw err;
          if (res.length === 0) {
            console.log(
              "Product does not exist! Enter a different product ID."
            );

            shopping();
          } else {
            inquirer
              .prompt({
                name: "quantity",
                type: "input",
                message: "How many do you want to buy?"
              })
              .then(function(answer2) {
                var quantity = answer2.quantity;
                if (quantity > res[0].stock_quantity) {
                  console.log(
                    "Sorry. We only have " +
                      res[0].stock_quantity +
                      " items of that left."
                  );

                  shopping();
                } else {
                  console.log("");
                  console.log(res[0].products_name + " purchased");
                  console.log(quantity + " qty at $" + res[0].price);

                  var newQuantity = res[0].stock_quantity - quantity;
                  connection.query(
                    "UPDATE products SET stock_quantity = " +
                      newQuantity +
                      " WHERE id = " +
                      res[0].id,

                    function(err, resUpdate) {
                      if (err) throw err;
                      console.log("");
                      console.log("Your order is complete");
                      console.log("See you soon!");
                      console.log("");
                      connection.end();
                    }
                  );
                }
              });
          }
        });
    });
};

display();
