INSERT INTO usrtype VALUES (1,'Driver');
INSERT INTO usrtype VALUES (2,'Owner');
INSERT INTO usrtype VALUES (3,'Mechanic');

INSERT INTO rentstate VALUES (1,'Scheduled');
INSERT INTO rentstate VALUES (2,'Started');
INSERT INTO rentstate VALUES (3,'Finished');

INSERT INTO repairtype VALUES (1,'Paint job');
INSERT INTO repairtype VALUES (2,'Mechanical');
INSERT INTO repairtype VALUES (3,'body Work');

INSERT INTO carstate VALUES (1,'available');
INSERT INTO carstate VALUES (2,'rented');
INSERT INTO carstate VALUES (3,'workshop');
INSERT INTO carstate VALUES (4,'unavailable');

--password:1234
INSERT INTO usr VALUES (1,'driver','123456', 'driver','$2b$10$Tp7f5YzlN4f3bH/.4hWbU.jmb7wPxmQ0luFpV/io.FnBxaMzIj3Zi',null,'1');
INSERT INTO usr VALUES (2,'admin','234512541', 'admin','$2b$10$Tp7f5YzlN4f3bH/.4hWbU.jmb7wPxmQ0luFpV/io.FnBxaMzIj3Zi',null,'2');
INSERT INTO usr VALUES (3,'mech','234512541', 'mech','$2b$10$Tp7f5YzlN4f3bH/.4hWbU.jmb7wPxmQ0luFpV/io.FnBxaMzIj3Zi',null,'3');

--car & images
INSERT INTO car (car_licenseplate, car_brand, car_model, car_year, car_bhp, car_engine, car_fuel, car_gearbox, car_drivetrain, car_doors, car_seats, car_bootcapacity, car_equi_ext, car_priceday, car_carstate_id, car_usr_id)
VALUES ('54-23-AV','Volkswagen', 'Passat','2001','130hp','1.9TDI','Diesel','5M','FWD','5','5','495L','AC;Heated Seats;Bluetooth Radio','120','1','2');
INSERT INTO carimage (carimage_link, carimage_car_id) VALUES ('https://media.discordapp.net/attachments/1094210400469397614/1094210455838408764/Passa_image1.jpg?width=1246&height=701',1);
INSERT INTO carimage (carimage_link, carimage_car_id) VALUES ('https://media.discordapp.net/attachments/1094210400469397614/1094210456354295868/Passat_image2.jpg?width=1246&height=701',1);

INSERT INTO carservices(carservices_type, carservices_due,carservices_car_id) VALUES ();
INSERT INTO carservices(carservices_type, carservices_due,carservices_car_id) VALUES ();

INSERT INTO car (car_licenseplate, car_brand, car_model, car_year, car_bhp, car_engine, car_fuel, car_gearbox, car_drivetrain, car_doors, car_seats, car_bootcapacity, car_equi_ext, car_priceday, car_carstate_id, car_usr_id)
VALUES ('23-GA-21','Audi', 'A4','2001','130hp','1.9TDI','Diesel','5M','FWD','5','5','490L','AC;Heated Seats;Bluetooth Radio','250','1','2');
INSERT INTO carimage (carimage_link, carimage_car_id) VALUES ('https://media.discordapp.net/attachments/1094210400469397614/1094210454517203024/Audi_image1.jpg?width=1246&height=701',2);
INSERT INTO carimage (carimage_link, carimage_car_id) VALUES ('https://media.discordapp.net/attachments/1094210400469397614/1094210455263776858/Audi_image2.jpg?width=1246&height=701',2);

INSERT INTO carservices(carservices_type, carservices_due,carservices_car_id) VALUES ();
INSERT INTO carservices(carservices_type, carservices_due,carservices_car_id) VALUES ();

INSERT INTO car (car_licenseplate, car_brand, car_model, car_year, car_bhp, car_engine, car_fuel, car_gearbox, car_drivetrain, car_doors, car_seats, car_bootcapacity, car_equi_ext, car_priceday, car_carstate_id, car_usr_id)
VALUES ('61-PO-41','Volkswagen', 'Pollo','2001','75hp','1.4TDI','Diesel','5m','FWD','5','5','100L','AC;Heated Seats;Bluetooth Radio','80','1','2');
INSERT INTO carimage (carimage_link, carimage_car_id) VALUES ('https://media.discordapp.net/attachments/1094210400469397614/1094210454223597578/Polo_image2.jpg?width=1246&height=701',3);
INSERT INTO carimage (carimage_link, carimage_car_id) VALUES ('https://media.discordapp.net/attachments/1094210400469397614/1094210456916344882/Polo_image1.jpg?width=1246&height=701',3);

INSERT INTO carservices(carservices_type, carservices_due,carservices_car_id) VALUES ();
INSERT INTO carservices(carservices_type, carservices_due,carservices_car_id) VALUES ();

INSERT INTO car (car_licenseplate, car_brand, car_model, car_year, car_bhp, car_engine, car_fuel, car_gearbox, car_drivetrain, car_doors, car_seats, car_bootcapacity, car_equi_ext, car_priceday, car_carstate_id, car_usr_id)
VALUES ('23-45-AB','Audi', 'A1','2019','95hp','25TFSI','Petrol','5m','FWD','5','5','335L','AC;Heated Seats;Bluetooth Radio; Led Headlights;Cruise Controll','120','1','2');
INSERT INTO carimage (carimage_link, carimage_car_id) VALUES ('https://media.discordapp.net/attachments/1094210400469397614/1095432056999268352/Audi_A1_2.jpg?width=1246&height=701',4);
INSERT INTO carimage (carimage_link, carimage_car_id) VALUES ('https://media.discordapp.net/attachments/1094210400469397614/1095432057632608316/Audi_A1_1.jpg?width=1246&height=701',4);

INSERT INTO carservices(carservices_type, carservices_due,carservices_car_id) VALUES ();
INSERT INTO carservices(carservices_type, carservices_due,carservices_car_id) VALUES ();

INSERT INTO car (car_licenseplate, car_brand, car_model, car_year, car_bhp, car_engine, car_fuel, car_gearbox, car_drivetrain, car_doors, car_seats, car_bootcapacity, car_equi_ext, car_priceday, car_carstate_id, car_usr_id)
VALUES ('85-IT-23','Ford', 'Smax','2012','140hp','2.0TDCi','Diesel','6m','FWD','5','5','465L','AC;Heated Seats;Bluetooth Radio; Led Headlights;Cruise Controll','80','1','2');
INSERT INTO carimage (carimage_link, carimage_car_id) VALUES ('https://media.discordapp.net/attachments/1094210400469397614/1095442367668035644/ford_Smax2.jpg?width=1246&height=701',5);
INSERT INTO carimage (carimage_link, carimage_car_id) VALUES ('https://media.discordapp.net/attachments/1094210400469397614/1095442368116838511/ford_Smax1.jpg?width=1246&height=701',5);

INSERT INTO carservices(carservices_type, carservices_due,carservices_car_id) VALUES ();
INSERT INTO carservices(carservices_type, carservices_due,carservices_car_id) VALUES ();


INSERT INTO car (car_licenseplate, car_brand, car_model, car_year, car_bhp, car_engine, car_fuel, car_gearbox, car_drivetrain, car_doors, car_seats, car_bootcapacity, car_equi_ext, car_priceday, car_carstate_id, car_usr_id)
VALUES ('72-PO-08','Opel', 'Astra','2004','100hp','1.7CDTI','Diesel','5m','FWD','5','5','380L','AC;Heated Seats;Bluetooth Radio; Led Headlights;Cruise Controll','60','1','2');
INSERT INTO carimage (carimage_link, carimage_car_id) VALUES ('https://media.discordapp.net/attachments/1094210400469397614/1095444619552108635/opel_astra2.jpg?width=1246&height=701',6);
INSERT INTO carimage (carimage_link, carimage_car_id) VALUES ('https://media.discordapp.net/attachments/1094210400469397614/1095444620047032440/opel_astra1.jpg?width=1246&height=701',6);

INSERT INTO carservices(carservices_type, carservices_due,carservices_car_id) VALUES ();
INSERT INTO carservices(carservices_type, carservices_due,carservices_car_id) VALUES ();

