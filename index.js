const mysql = require('mysql');
const inquirer = require('inquirer');
let connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,

  user: 'root',
  password: 'root',

  database: 'bamazon_DB'
})

//Begin test of connection to database
connection.connect( err => {
  if (err){
    console.log(err)
  }
  // Beginning of connection to database
  initialization();
});

const displayInventory = () => {
    connection.query("SELECT item_id, product_name, price FROM inventory", (err, res) => {
        if(err){
          console.log(err);
        }
        console.log(res);
    });
};

const addItem = (name, department, price, stock) => {
    let sql = "INSERT INTO inventory(product_name, department_name, price, stock_quantity) VALUES ?";
    let values = [[name, department, price, stock]];

    connection.query(sql, [values], (err, res) => {
        if(err){
          console.log(err);
        };
        console.log(res);
        displayInventory();
    });
};

const inquireAndAdd = () => {
  inquirer.prompt([
    {
      type: 'input',
      message: 'Enter name of Product:',
      name: 'productname'
    },
    {
      type: 'input',
      message: 'Enter Department/Category of Product:',
      name: 'productdept'
    },
    {
      type: 'input',
      message: 'Enter a price',
      name: 'productprice',
      validate: input => {
        if (input.isNaN){
            console.log("\nMust provide Number");
            return false;
        }
        else {
          return true;
        }
      }
    },
    {
      type: 'input',
      message: 'Enter quantity',
      name: 'quant',
      validate: input => {
        if (input.isNaN){
            console.log("Must provide Number");
            return false;
        } else {
            return true;
        }
      }
    }
  ]).then(answer => {
        addItem(answer.productname, answer.productdept, answer.productprice, answer.quant);
        console.log("\nSuccessfully Posted\n");
        initialization();
  })
}

const initialization = () => {
  inquirer.prompt([
    {
      type: 'rawlist',
      message: 'Would you like to BID or POST',
      choices: ["POST", "BID"],
      name: 'Intro'
    }
  ]).then((answer) => {
      if (answer.Intro === 'POST'){
        console.log("Posting!");
        inquireAndAdd();
      } else {
        displayInventory();
      }
  });
}
