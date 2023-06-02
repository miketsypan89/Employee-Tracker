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
            if (answers.MainMenu == "Add A Department") {
                addDepartment()
            }
            if (answers.MainMenu == "Add A Role") {
                addRole()
            }
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

function addDepartment() {
    inquirer.prompt([{
        type: "input",
        name: "departmentName",
        message: "What is the name of the new department?",
    }]).then((answer) => {
        connection.query(
            `INSERT INTO department (name) VALUES ("${answer.departmentName}")`,
            function (err, results, fields) {
                console.table(results);
                startApp()
            }
        )
    })
};

function addRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "roleName",
            message: "What is the name of the new role?",
        },
        {
            type: "input",
            name: "salary",
            message: "What's the base salary in this role'?",
        },
        {
            type: "list",
            name: "department_id",
            message: "What department does this role belong to?",
        },
    ]).then((answer) => {
        connection.query(
            `INSERT INTO role (title, salary, department_id) VALUES ("${answer.roleName}")`,
            function (err, results, fields) {
                console.table(results);
                startApp()
            }
        )
    })
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
            type: "list",
            name: "role",
            message: "What is the new employee's role?",
            choices: ["Dispatcher", "Accountant", "Safety_manager", "Shop_manager", "Warehouse_manager"]
        },
        {
            type: "list",
            name: "manager",
            message: "Who is the manager of this new employee?",
            choices: ["Mike Tsypan", "Tony Simchuk", "Katie Kolomoytsev"]
        }
    ]).then((answers) => {
        console.log(answers);
        let roleId = 0
        if (answers.role == "Dispatcher") {
            roleId = 1
        }
        if (answers.role == "Accountant") {
            roleId = 2
        }
        if (answers.role == "Safety_manager") {
            roleId = 3
        }
        if (answers.role == "Shop_manager") {
            roleId = 4
        }
        if (answers.role == "Warehouse_manager") {
            roleId = 5
        }

        let managerId = 0
        if (answers.manager == "Mike Tsypan") {
            managerId = 1
        }
        if (answers.manager == "Tony Simchuk") {
            managerId = 2
        }
        if (answers.manager == "Katie Kolomoytsev") {
            managerd = 3
        }
        connection.query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answers.firstName}", "${answers.lastName}", "${roleId}", "${managerId}")`,
            function (err, results, fields) {
                console.table(results);
                startApp()
            }
        )
    })

};

//startApp();

connection.query(
    `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Artem", "Alek", 2, null)`,
    function (err, results, fields) {
        console.table(results);
        startApp()
    }
)