//*Depencies
const mysql = require("mysql");
const inquirer = require("inquirer");

//*Creates MySQL connection
const connection = mysql.createConnection({
host: "localhost",
port: 3000,
user: "root",
password:"",
database: "employees_DB"
});

connection.connect(function(err){
    if (err) throw err;
    //!Welcome msg to present with ASCII intro. Not to repeat on mainMunu func
    // welcomeMessage();
    mainMenu();
});

function welcomeMessage() {
        //!Welcome msg to present with ASCII intro. Not to repeat on mainMunu func
}

function mainMenu() {
    console.log("Welcome to the main menu. Please choose from the options below:");
    inquirer.prompt({
        name: "add",
        type: "checkbox",
        choices: [
        "Add Department", 
        "Add Role", 
        "Add Employee",
        "View Department", 
        "View Role", 
        "View Employee", 
        "Update Employee Role"]
    }).then(function(answer) {
        switch (answer.action) {
            case "Add Department":
                addDept();
                break;
        
            case "Add Role":
                addRole();
                break;
                
            case "Add Employee":
                addEmp();
                break;
            
            case "View Department":
                viewDept();
                break;
                    
            case "View Role":
                viewRole();
                break;
                
            case "View Employee":
                viewEmp();
                break;

            case "Update Employee Role":
                updateRole();
                break;
            }
});
}

function addDept() {

}
