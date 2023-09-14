
CREATE DATABASE IF NOT EXISTS `keycloak`;

GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';

CREATE USER 'keycloak_user'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON keycloak.* TO 'keycloak_user'@'%' WITH GRANT OPTION;