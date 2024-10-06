--In the case of the database needing to be reset, running this script in Cloud Sql Studio should recrate the empty database

DROP TABLE IF EXISTS `users`;
CREATE TABLE users (
    username VARCHAR(255),
    hashed_password VARCHAR(255)
); 