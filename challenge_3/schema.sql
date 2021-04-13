DROP DATABASE IF EXISTS checkout;

CREATE DATABASE checkout;

DROP TABLE IF EXISTS users;

CREATE TABLE users (

  id INT NOT NULL PRIMARY KEY,
  first_name MEDIUMTEXT,
  last_name MEDIUMTEXT,
  email MEDIUMTEXT,
  password MEDIUMTEXT,

)

DROP TABLE IF EXISTS cards;

CREATE TABLE cards (

  id INT NOT NULL PRIMARY KEY,
  number INT,
  expiry_month INT,
  expiry_year INT,
  cvv INT,

)

DROP TABLE IF EXISTS orders;

CREATE TABLE orders (

  id INT NOT NULL PRIMARY KEY,
  line_1 MEDIUMTEXT,
  line_2 MEDIUMTEXT,
  city MEDIUMTEXT,
  state MEDIUMTEXT,
  zipcode INT,
  phone INT

)