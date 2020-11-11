//*Depencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const { up } = require("inquirer/lib/utils/readline");

//*Creates MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employees_db",
});

//*Global variables
// let roster = [];

connection.connect(function (err) {
  if (err) throw err;
  //!Welcome msg to present with ASCII intro. Not to repeat on mainMenu func
  // welcomeMessage();
  mainMenu();
});

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
        name: "newDept",
      },
    ])
    .then(function (answer) {
      const deptName = answer.newDept;
      connection.query(
        "INSERT INTO department SET ?",
        {
          dept_name: deptName,
        },
        function (err, res) {
          if (err) throw err;
          mainMenu();
        }
      );
      console.log(deptName + "department successfully entered!\n");
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        message: "Please enter role name: ",
        type: "input",
        name: "newRole",
      },
      {
        message: "Please enter role's department: ",
        type: "input",
        name: "deptId",
      },
    ])
    .then(function (answer) {
      const roleName = answer.newRole;

      const deptId = answer.deptId;

      connection.query(
        "INSERT INTO role SET ?",
        {
          title: roleName,
          dept_id: deptId,
        },
        function (err, res) {
          if (err) throw err;
          mainMenu();
        }
      );
      console.log(
        roleName +
          " role successfully entered to department id# " +
          deptId +
          "!\n"
      );
    });
}

function addEmp() {
  inquirer
    .prompt([
      {
        message: "Please enter employee's first name: ",
        type: "input",
        name: "newEmpFirst",
      },
      {
        message: "Please enter employee's last name: ",
        type: "input",
        name: "newEmpLast",
      },
      {
        message: "Please enter employee's role id#: ",
        type: "input",
        name: "newEmpRole",
      },
      {
        message: "Please enter employee's manager id#: ",
        type: "input",
        name: "newEmpMgr",
      },
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
          manager_id: empMgr,
        },
        function (err, res) {
          if (err) throw err;
          mainMenu();
        }
      );
      console.log(
        empNameFirst +
          " " +
          empNameLast +
          "successfully entered with role id# " +
          empRole +
          " and manager id# " +
          empMgr +
          "!\n"
      );
    });
}

function viewDept() {
  connection.query("SELECT * FROM department", function (err, res) {
    console.table(res);
    if (err) throw err;
    mainMenu();
  });
}

function viewRole() {
  connection.query("SELECT * FROM role", function (err, res) {
    console.table(res);
    if (err) throw err;
    mainMenu();
  });
}

function viewEmp() {
  connection.query("SELECT * FROM employee", function (err, res) {
    console.table(res);
    if (err) throw err;
    mainMenu();
  });
  connection.query();
}

function setRoster() {
  // const query = "SELECT concat (employee.first_name, ' ', employee.last_name) AS employee_full_name FROM employee ;";
  const query =
    "SELECT CONCAT (first_name, ' ', last_name) AS full_name FROM employee;";

  connection.query(query, (err, res) => {
    if (err) throw err;

    for (let i = 0; i < res.length; i++) {
      roster.push(res[i].full_name);
    }

    console.log(roster);
    return roster;
  });
}

function updateRole() {
  //*Variables for storing arrays of data pulled from MySQL
  let roster = [];
  let roleIds = [];
  let roles = [];
  let dataObj = {};
  let newRoleId = 0;
  let  chosenEmpId = 0; 

  const query =
    "SELECT  role.id, title, CONCAT (first_name, ' ', last_name) AS full_name FROM role, employee WHERE role.id = employee.role_id";

  connection.query(query, function (err, res) {
    if (err) throw err;

    dataObj = res;
    // console.log(dataObj);

    for (let i = 0; i < res.length; i++) {
      roleIds.push(res[i].id);
      roles.push(res[i].title);
      roster.push(res[i].full_name);
    }
    // console.log({roleIds});
    // console.log({roles});
    // console.log({roster});
    inquirer
      .prompt([
        {
          name: "employee",
          type: "list",
          message: "Which employee would you like to update?",
          choices: roster,
        },
        {
          name: "role",
          type: "list",
          message: "Which role would you like to assign to employee?",
          choices: roles,
        },
      ])
      .then(function (answer) {
        const newRole = answer.role;
        const chosenEmployee = answer.employee;

        console.log(newRole);
        console.log(chosenEmployee);
        for (let i = 0; i < roster.length; i++) {
          if (chosenEmployee === dataObj[i].full_name) {
            console.log(dataObj[i].full_name + " will be updated to: ");

            for (let j = 0; j < roleIds.length; j++) {
              if (newRole === dataObj[j].title) {
                newRoleId = roleIds[j];
                chosenEmpId = j + 1;
              }
            }
          }
        }


        const updateQuery = "UPDATE employee SET role_id = ? WHERE id = ?";
        connection.query(updateQuery, [newRoleId, chosenEmpId], function(err, res){
          if(err) throw err;
          console.log(res);
        });

        console.log("Role ID " + newRoleId);
        console.log("Success@ ");
        console.table(dataObj);
      });
  });
}
