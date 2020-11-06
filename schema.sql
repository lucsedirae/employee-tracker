DROP DATABASE IF EXISTS employees_DB;
CREATE DATABASE employees_DB;

USE employees_DB;

CREATE TABLE department (
	id INT NOT NULL AUTO_INCREMENT,
    dept_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
	id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL DEFAULT "unassigned",
    salary DECIMAL(7, 2) NOT NULL DEFAULT 0,
    dept_id INT NOT NULL DEFAULT 0,
	PRIMARY KEY (id)
);

CREATE TABLE employee (
	id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL DEFAULT 0,
    manager_id INT NULL DEFAULT 0,
    PRIMARY KEY (id)
);