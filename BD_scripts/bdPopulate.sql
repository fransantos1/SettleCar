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


INSERT INTO usr VALUES ('driver','123456', 'atuamaede4@mail.com',null,'1');
INSERT INTO usr VALUES ('me','234512541', 'atuamaede4@mail.com',null,'2');
INSERT INTO usr VALUES ('me','234512541', 'atuamaede4@mail.com',null,'3');


INSERT INTO car VALUES (1,'54-23-AV','Volkswagen', 'Passat','1.9TDI','Diesel','5M','FWD','5','5','500L','AC;Heated Seats;Bluetooth Radio','120','1','9');
INSERT INTO car VALUES (2,'23-GA-21','Audi', 'A4','1.9TDI','Diesel','5M','FWD','5','5','490L','AC;Heated Seats;Bluetooth Radio','250','2','9');
INSERT INTO car VALUES (3,'61-PO-41','Volkswagen', 'Pollo','1.4TDI','Diesel','5m','FWD','5','5','100L','AC;Heated Seats;Bluetooth Radio','80','3','9');
