USE employees_db;

INSERT INTO department (dept_name)
VALUES 
	("Rhythm Section"),
	("Noodles"), 
    ("Further");
    
INSERT INTO role (title, salary, dept_id)
VALUES 
	("Captain Trips", 80000, 2),
	("Guitar", 70000, 1),
	("Bass", 70000, 1),
	("Drums", 70000, 1),
	("Keys", 80000, 2),
	("Space Cadet", 99999, 1),
	("Wailing Banshee", 2, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
	("Jerry", "Garcia", 1, 0),
	("Bobby", "Weir", 2, 1),
    ("Billy", "Kreutzmann", 4, 1),
    ("Mickey", "Hart", 6, 1),
    ("Phil", "Lesh", 3, 1),
    ("Pig", "McKernan", 5, 1),
    ("Donna", "Godchaux", 7, 6),
    ("Keith", "Godchaux", 5, 6),
    ("Brent", "Mydland", 5, 6),
    ("Bruce", "Hornsby", 5, 6),
    ("Vince", "Welnick", 5, 6);