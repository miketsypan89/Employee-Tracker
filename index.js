const inquirer = require('inquirer');
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'Employee_Tracker',
    password: 'Password1$'
});


function startApp() {
    console.log("EMPLOYEE TRACKER")
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
        'SELECT * FROM employee INNER JOIN role ON employee.role_id = role.id',
        function (err, results, fields) {
            console.log(err)
            console.table(results);
            console.log(results[42])
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
    const departments = ["Dispatch", "Accounting", "Safety", "Shop", "Warehouse", "FireStation", "Housekeeping"]
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
            name: "department_name",
            message: "What department does this role belong to?",
            choices: departments
        },
    ]).then((answer) => {
        let department_id = 0;

        for (let i = 0; i < departments.length; i++) {
            if (departments[i] === answer.department_name) {
                department_id = i + 1
            }
        }

        console.log('dep:id', department_id)


        connection.query(
            `INSERT INTO role (title, salary, department_id) VALUES ("${answer.roleName}", "${answer.salary}", "${department_id}")`,
            function (err, results, fields) {
                console.log(err)
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
    // Need to query the DB to get the list of roles
    connection.query(
        `SELECT * from role`,
        function (err, results) {
            const roles = results;

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
                    choices: roles.map(role => role.title) // [role.title, role.title] -> [dispatcher, account,]
                },
                {
                    type: "list",
                    name: "manager",
                    message: "Who is the manager of this new employee?",
                    choices: ["Mike Tsypan", "Tony Simchuk", "Katie Kolomoytsev"]
                }
            ]).then((answers) => {
                let roleId = 0

                // need to query the roles tables and then use the result list to drive this logic
                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].title === answers.role) {
                        roleId = roles[i].id
                    }
                }

                console.log(roleId)

                // if (answers.role == "Dispatcher") {
                //     roleId = 1
                // }
                // if (answers.role == "Accountant") {
                //     roleId = 2
                // }
                // if (answers.role == "Safety_manager") {
                //     roleId = 3
                // }
                // if (answers.role == "Shop_manager") {
                //     roleId = 4
                // }
                // if (answers.role == "Warehouse_manager") {
                //     roleId = 5
                // }

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


        }
    )




};

startApp();
