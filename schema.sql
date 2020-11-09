DROP DATABASE IF EXISTS employees_DB;
CREATE DATABASE employees_DB;

USE employees_DB;

CREATE TABLE department (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL DEFAULT "unassigned",
    salary DECIMAL(7, 2) NOT NULL DEFAULT 0,
    dept_id INT UNSIGNED NOT NULL,
    INDEX dep_index (dept_id),
    CONSTRAINT fk_dept FOREIGN KEY (dept_id) REFERENCES department (id) ON DELETE CASCADE
);

CREATE TABLE employee (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT UNSIGNED NOT NULL,
    INDEX role_index (role_id),
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role (id) ON DELETE CASCADE,
    manager_id INT UNSIGNED,
    INDEX mgr_index (manager_id),
    CONSTRAINT fk_mgr FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);