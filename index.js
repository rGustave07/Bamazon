const mysql = require('mysql');

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
  addItem('Macbook Pro', 'Electronics', 2250, 3);
})

const displayInventory = () => {
    connection.query("SELECT item_id, product_name, price FROM inventory", (err, res) => {
        if(err){
          console.log(err);
        }
        console.log(res);
    });
};

const addItem = (name, department, price, stock) => {
    let sql = "INSERT INTO inventory SET ?";
    let values = {product_name: name, department_name: department, price: price, stock_quantity: stock};

    connection.query(sql, values, (err, res) => {
        if(err){
          console.log(err);
        };
        console.log(res);
        displayInventory();
    });
};
