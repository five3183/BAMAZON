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
VALUES ("Federal_9mm","Handgun_Ammo", 200, 100 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Winchester_9mm","Handgun_Ammo", 214, 100 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Speer_9mm","Handgun_Ammo", 250, 100 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Federal_5.56","Rifle_Ammo", 339, 100 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Winchester_5.56","Rifle_Ammo", 420, 100 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Federal_300_AAC","Rifle_Ammo", 700, 100 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Remington_300_AAC","Rifle_Ammo", 950, 100 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Federal_.308_WIN","Rifle_Ammo", 1148, 100 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Remington_.308_WIN","Rifle_Ammo", 1220, 100 );

