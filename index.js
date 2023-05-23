const inquirer = require('inquirer');
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'Employee_Tracker',
    password: 'Password1$'
});


function startApp() {
    console.log('test')
    inquirer.prompt([
        {
            type: "list",
            name: "MainMenu",
            message: "What would you like to do?",
            choices: ["View All Departments", "View All Employees", "View All Roles", "Add An Employee", "Add A Department", "Add A Role", "Update An Employee Role"]
        }
    ])
        .then((answers) => {
            if (answers.MainMenu == "View All Departments") {
                viewDepartments()
            }
            if (answers.MainMenu == "View All Employees") {
                viewEmployees()
            }
            if (answers.MainMenu == "View All Roles") {
                viewRoles()
            }
            if (answers.MainMenu == "Add An Employee") {
                addAnEmployee()
            }
            // if (answers.MainMenu == "Add A Department") {
            //     ()
            // }
            // if (answers.MainMenu == "Add A Role") {
            //     ()
            // }
            // if (answers.MainMenu == "Update An Employee Role") {
            //     ()
            // }
            // Use user feedback for... whatever!!
        })
        .catch((error) => {
            console.log(error)
        });
}



function viewEmployees() {
    connection.query(
        'SELECT * FROM employee',
        function (err, results, fields) {
            console.table(results);
            startApp()
        }
    )
};

function viewDepartments() {
    connection.query(
        'SELECT * FROM department',
        function (err, results, fields) {
            console.table(results);
            startApp()
        }
    )
};

function viewRoles() {
    connection.query(
        'SELECT * FROM role',
        function (err, results, fields) {
            console.table(results);
            startApp()
        }
    )
};

function addAnEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the new employee's first name?",
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the new employee's last name?",
        },
        {
            type: "input",
            name: "role",
            message: "What is the new employee's role?",
        },
        {
            type: "input",
            name: "manager",
            message: "Who is the new employee's manager?",
        }
    ]) .then((answers) => {
        console.log(answers);
        connection.query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answers.firstName}", "${answers.lastName}", 1, null)`,
            function (err, results, fields) {
                console.table(results);
                startApp()
            }
        )
      })
    
};

startApp();