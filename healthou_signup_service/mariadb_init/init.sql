CREATE DATABASE IF NOT EXISTS `healthou_signup` CHARACTER SET 'utf8' COLLATE 'utf8_general_ci';
CREATE DATABASE IF NOT EXISTS `healthou_signup_test` CHARACTER SET 'utf8' COLLATE 'utf8_general_ci';

CREATE USER 'healthou'@'%' IDENTIFIED BY 'healthou';
GRANT ALL PRIVILEGES ON *.* TO 'healthou'@'%';

DROP USER 'healthou_user'@'%';
FLUSH PRIVILEGES;

CREATE USER 'healthou_user'@'%' IDENTIFIED BY 'healthou_user';
GRANT ALL PRIVILEGES ON *.* TO 'healthou_user'@'%';
GRANT ALL PRIVILEGES ON `healthou_%`.* TO 'healthou_user'@'%';
FLUSH PRIVILEGES;