DROP DATABASE IF EXISTS fridge_friend_db;
CREATE DATABASE fridge_friend_db;

USE fridge_friend_db;

CREATE TABLE shoppingList (
    id int NOT NULL AUTO_INCREMENT,
    product_name varchar(45) NOT NULL,
    quantity integer NULL, 
    PRIMARY KEY (id)
);

CREATE TABLE kitchenInventory(
    id int NOT NULL AUTO_INCREMENT,
    product_name varchar(45) NOT NULL,
    quantity integer NULL, 
    frequency integer NULL, 
    expiration_date DATE NULL
    PRIMARY KEY (id)
);