//*Depencies
const mysql = require("mysql");
const inquirer = require("inquirer");

//*Creates MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employees_db",
});

connection.connect(function (err) {
  if (err) throw err;
  //!Welcome msg to present with ASCII intro. Not to repeat on mainMenu func
  // welcomeMessage();
  mainMenu();
});

// // *global variables
// const roster = connection.query("SELECT role_id FROM employee", );


function welcomeMessage() {
  //!Welcome msg to present with ASCII intro. Not to repeat on mainMenu func
}

function mainMenu() {
  console.log(
    "Welcome to the main menu. Please choose from the options below:"
  );
  inquirer
    .prompt([
      {
        message:
          "Welcome to the main menu. Please choose from the options below:",
        type: "list",
        name: "menu",
        choices: [
          "Add Department",
          "Add Role",
          "Add Employee",
          "View Department",
          "View Role",
          "View Employee",
          "Update Employee Role",
          new inquirer.Separator(),
        ],
      },
    ])
    .then(function (answer) {
      switch (answer.menu) {
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
  inquirer
    .prompt([
      {
        message: "Please enter department name: ",
        type: "input",
        name: "newDept"
      }
    ])
    .then(function (answer) {
      const deptName = answer.newDept;
      connection.query(
        "INSERT INTO department SET ?",
        {
          dept_name: deptName
        },
        function(err, res) {
          if (err) throw err;
          mainMenu();
        }
      );
      console.log( deptName + "department successfully entered!\n")
    });
}

function addRole() {
  inquirer
  .prompt([
    {
      message: "Please enter role name: ",
      type: "input",
      name: "newRole"
    },
    {
      message: "Please enter role's department: ",
      type: "input",
      name: "deptId"
    }
  ])
  .then(function (answer) {
    const roleName = answer.newRole;

    const deptId = answer.deptId;

    connection.query(
      "INSERT INTO role SET ?",
      {
        title: roleName,
        dept_id: deptId
      },
      function(err, res) {
        if (err) throw err;
        mainMenu();
      }
    );
    console.log( roleName + " role successfully entered to department id# "+deptId+"!\n")
  });
}

function addEmp() {
  inquirer
  .prompt([
    {
      message: "Please enter employee's first name: ",
      type: "input",
      name: "newEmpFirst"
    },
    {
      message: "Please enter employee's last name: ",
      type: "input",
      name: "newEmpLast"
    },
    {
      message: "Please enter employee's role id#: ",
      type: "input",
      name: "newEmpRole"
    },
    {
      message: "Please enter employee's manager id#: ",
      type: "input",
      name: "newEmpMgr"
    }
  ])
  .then(function (answer) {
    const empNameFirst = answer.newEmpFirst;
    const empNameLast = answer.newEmpLast;
    const empRole = answer.newEmpRole;
    const empMgr = answer.newEmpMgr;

    connection.query(
      "INSERT INTO employee SET ?",
      {
        first_name: empNameFirst,
        last_name: empNameLast,
        role_id: empRole,
        manager_id: empMgr
      },
      function(err, res) {
        if (err) throw err;
        mainMenu();
      }
    );
    console.log( empNameFirst + " "+empNameLast + "successfully entered with role id# "+empRole+" and manager id# "+empMgr+"!\n");
  });
}

function viewDept() {
  connection.query("SELECT * FROM department", function(err, res){
    console.table(res);
    if(err) throw err;
    mainMenu();
  })
  
}

function viewRole() {
  connection.query("SELECT * FROM role", function(err, res){
    console.table(res);
    if(err) throw err;
    mainMenu();
  })
}

function viewEmp() {
  connection.query("SELECT * FROM employee", function(err, res){
    console.table(res);
    if(err) throw err;
    mainMenu();
  })
  connection.query()
}

function setRoster(employee) {

}

function updateRole() {
  
  // const employee = [];
  // const changed_role_id =0 ;  

  // inquirer.prompt({
  //   name: "Select an employee to update: ",
  //   choices
  // })

  // connection.query("SELECT * FROM employee", function(err, res){
  //   if (err) throw err;
  //     employee = 
  //   console.log(res.role_id);
  // })





  // connection.query("UPDATE role_id SET ? WHERE ?",
  // [
  //   {

  //   }
  // ])



  console.log("Success!");
}
