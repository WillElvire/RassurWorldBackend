CREATE USER 'dev'@'localhost' IDENTIFIED BY 'password';
FLUSH PRIVILEGES;
GRANT ALL PRIVILEGES ON rassur_world.* TO 'dev'@'localhost';