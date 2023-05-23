INSERT INTO department (name)
VALUES
("Dispatch"),
("Accounting"),
("Safety"),
("Shop"),
("Warehouse");

INSERT INTO role (title, salary, department_id)
VALUES
("Dispatcher", 70000, 1),
("Accountant", 60000, 2),
("Safety_manager", 60000, 3),
("Shop_manager", 65000, 4),
("Warehouse_manager", 65000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Mike", "Tsypan", 1, null),
("Tony", "Simchuk", 1, 1),
("Andrey", "Murza", 1, 1),
("Katie", "Kolomoytsev", 1, 1),
("Oleg", "Savenok", 1, 1),
("Yelena", "Kopets", 2, null),
("Michael", "Iotko", 3, null),
("Vitaly", "Leshkevich", 4, null),
("Alex", "Mantsevich", 5, null),
("Paul", "Mantsevich", 5, null);