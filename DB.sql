DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
item_id int(11) NOT NULL AUTO_INCREMENT,
  product_name varchar(30) NOT NULL,
  department_name varchar(20) NOT NULL,
  price int(11) DEFAULT '0',
  stock_quantity int(11) DEFAULT '0',
  PRIMARY KEY (item_id)
);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Federal 9mm","Handgun Ammo", 200, 100 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Winchester 9mm","Handgun Ammo", 214, 100 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Speer 9mm","Handgun Ammo", 250, 100 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Federal 5.56","Rifle Ammo", 339, 100 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Winchester 5.56","Rifle Ammo", 420, 100 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Federal 300 AAC","Rifle Ammo", 700, 100 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Remington 300 AAC","Rifle Ammo", 950, 100 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Federal .308 WIN","Rifle Ammo", 1148, 100 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Remington .308 WIN","Rifle Ammo", 1220, 100 );

