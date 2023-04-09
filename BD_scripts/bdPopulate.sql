INSERT INTO usrtype VALUES (1,'Driver');
INSERT INTO usrtype VALUES (2,'Owner');
INSERT INTO usrtype VALUES (3,'Mechanic');

INSERT INTO rentstate VALUES (1,'Scheduled');
INSERT INTO rentstate VALUES (2,'Started');
INSERT INTO rentstate VALUES (3,'Finished');

INSERT INTO repairtype VALUES (1,'Paint job');
INSERT INTO repairtype VALUES (2,'Mechanical');
INSERT INTO repairtype VALUES (3,'body Work');

INSERT INTO carstate VALUES (1,'Available');
INSERT INTO carstate VALUES (2,'Unavailable');
INSERT INTO carstate VALUES (3,'Workshop');

--password:1234
INSERT INTO usr VALUES (1,'driver','123456', 'atuamaede4@mail.com','$2b$10$Tp7f5YzlN4f3bH/.4hWbU.jmb7wPxmQ0luFpV/io.FnBxaMzIj3Zi',null,'1');
INSERT INTO usr VALUES (2,'admin','234512541', 'atuamaede4@mail.com','$2b$10$Tp7f5YzlN4f3bH/.4hWbU.jmb7wPxmQ0luFpV/io.FnBxaMzIj3Zi',null,'2');
INSERT INTO usr VALUES (3,'mech','234512541', 'atuamaede4@mail.com','$2b$10$Tp7f5YzlN4f3bH/.4hWbU.jmb7wPxmQ0luFpV/io.FnBxaMzIj3Zi',null,'3');


INSERT INTO car VALUES (1,'54-23-AV','Volkswagen', 'Passat','1.9TDI','Diesel','5M','FWD','5','5','500L','AC;Heated Seats;Bluetooth Radio','120','1','2');
INSERT INTO car VALUES (2,'23-GA-21','Audi', 'A4','1.9TDI','Diesel','5M','FWD','5','5','490L','AC;Heated Seats;Bluetooth Radio','250','2','2');
INSERT INTO car VALUES (3,'61-PO-41','Volkswagen', 'Pollo','1.4TDI','Diesel','5m','FWD','5','5','100L','AC;Heated Seats;Bluetooth Radio','80','3','2');

INSERT INTO carimage VALUES (1,'https://media.discordapp.net/attachments/1094210400469397614/1094210455838408764/Passa_image1.jpg?width=1246&height=701',1);
INSERT INTO carimage VALUES (2,'https://media.discordapp.net/attachments/1094210400469397614/1094210456354295868/Passat_image2.jpg?width=1246&height=701',1);

INSERT INTO carimage VALUES (3,'https://media.discordapp.net/attachments/1094210400469397614/1094210454517203024/Audi_image1.jpg?width=1246&height=701',2);
INSERT INTO carimage VALUES (4,'https://media.discordapp.net/attachments/1094210400469397614/1094210455263776858/Audi_image2.jpg?width=1246&height=701',2);

INSERT INTO carimage VALUES (5,'https://media.discordapp.net/attachments/1094210400469397614/1094210454223597578/Polo_image2.jpg?width=1246&height=701',3);
INSERT INTO carimage VALUES (6,'https://media.discordapp.net/attachments/1094210400469397614/1094210456916344882/Polo_image1.jpg?width=1246&height=701',3);

