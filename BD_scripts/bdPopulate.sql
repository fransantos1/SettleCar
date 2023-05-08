-- LOCATION
--map


--



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
INSERT INTO usr VALUES (4,'rent0','234512541', 'rent0','$2b$10$Tp7f5YzlN4f3bH/.4hWbU.jmb7wPxmQ0luFpV/io.FnBxaMzIj3Zi',null,'1');
INSERT INTO usr VALUES (5,'rent1','234512541', 'rent1','$2b$10$Tp7f5YzlN4f3bH/.4hWbU.jmb7wPxmQ0luFpV/io.FnBxaMzIj3Zi',null,'1');
INSERT INTO usr VALUES (6,'rent2','234512541', 'rent2','$2b$10$Tp7f5YzlN4f3bH/.4hWbU.jmb7wPxmQ0luFpV/io.FnBxaMzIj3Zi',null,'1');
INSERT INTO usr VALUES (7,'rent3','234512541', 'rent3','$2b$10$Tp7f5YzlN4f3bH/.4hWbU.jmb7wPxmQ0luFpV/io.FnBxaMzIj3Zi',null,'1');
INSERT INTO usr VALUES (8,'rent4','234512541', 'rent4','$2b$10$Tp7f5YzlN4f3bH/.4hWbU.jmb7wPxmQ0luFpV/io.FnBxaMzIj3Zi',null,'1');
--car & images
INSERT INTO car (car_licenseplate, car_brand, car_model, car_year, car_bhp, car_engine, car_fuel, car_gearbox, car_drivetrain, car_doors, car_seats, car_bootcapacity, car_equi_ext, car_priceday, car_carstate_id, car_usr_id)
VALUES ('54-23-AV','Volkswagen', 'Passat','2001','130hp','1.9TDI','Diesel','5M','FWD','5','5','495L','AC;Heated Seats;Bluetooth Radio','120','1','2');
INSERT INTO carimage (carimage_link, carimage_car_id) VALUES ('https://media.discordapp.net/attachments/1094210400469397614/1094210455838408764/Passa_image1.jpg?width=1246&height=701',1);
INSERT INTO carimage (carimage_link, carimage_car_id) VALUES ('https://media.discordapp.net/attachments/1094210400469397614/1094210456354295868/Passat_image2.jpg?width=1246&height=701',1);

INSERT INTO carservices(carservices_type, carservices_due,carservices_car_id) VALUES ('inspection','2023-12-04',1);
INSERT INTO carservices(carservices_type, carservices_due,carservices_car_id) VALUES ('insurance','2023-12-25',1);

INSERT INTO rent(rent_data_inicio, rent_data_final, rent_car_id, rent_usr_id, rent_rentstate_id) VALUES ('2023-08-3','2023-08-12',1,4,1);


INSERT INTO car (car_licenseplate, car_brand, car_model, car_year, car_bhp, car_engine, car_fuel, car_gearbox, car_drivetrain, car_doors, car_seats, car_bootcapacity, car_equi_ext, car_priceday, car_carstate_id, car_usr_id)
VALUES ('23-GA-21','Audi', 'A4','2001','130hp','1.9TDI','Diesel','5M','FWD','5','5','490L','AC;Heated Seats;Bluetooth Radio','250','1','2');
INSERT INTO carimage (carimage_link, carimage_car_id) VALUES ('https://media.discordapp.net/attachments/1094210400469397614/1094210454517203024/Audi_image1.jpg?width=1246&height=701',2);
INSERT INTO carimage (carimage_link, carimage_car_id) VALUES ('https://media.discordapp.net/attachments/1094210400469397614/1094210455263776858/Audi_image2.jpg?width=1246&height=701',2);

INSERT INTO carservices(carservices_type, carservices_due,carservices_car_id) VALUES ('inspection','2024-04-13',2);
INSERT INTO carservices(carservices_type, carservices_due,carservices_car_id) VALUES ('insurance','2024-03-25',2);

INSERT INTO rent(rent_data_inicio, rent_data_final, rent_car_id, rent_usr_id, rent_rentstate_id) VALUES ('2023-07-20','2023-08-5',2,5,1);

INSERT INTO car (car_licenseplate, car_brand, car_model, car_year, car_bhp, car_engine, car_fuel, car_gearbox, car_drivetrain, car_doors, car_seats, car_bootcapacity, car_equi_ext, car_priceday, car_carstate_id, car_usr_id)
VALUES ('61-PO-41','Volkswagen', 'Pollo','2001','75hp','1.4TDI','Diesel','5m','FWD','5','5','100L','AC;Heated Seats;Bluetooth Radio','80','1','2');
INSERT INTO carimage (carimage_link, carimage_car_id) VALUES ('https://media.discordapp.net/attachments/1094210400469397614/1094210454223597578/Polo_image2.jpg?width=1246&height=701',3);
INSERT INTO carimage (carimage_link, carimage_car_id) VALUES ('https://media.discordapp.net/attachments/1094210400469397614/1094210456916344882/Polo_image1.jpg?width=1246&height=701',3);

INSERT INTO carservices(carservices_type, carservices_due,carservices_car_id) VALUES ('inspection','2023-11-21',3);
INSERT INTO carservices(carservices_type, carservices_due,carservices_car_id) VALUES ('insurance','2023-11-10',3);

INSERT INTO rent(rent_data_inicio, rent_data_final, rent_car_id, rent_usr_id, rent_rentstate_id) VALUES ('2023-07-20','2023-08-12',3,6,1);

INSERT INTO car (car_licenseplate, car_brand, car_model, car_year, car_bhp, car_engine, car_fuel, car_gearbox, car_drivetrain, car_doors, car_seats, car_bootcapacity, car_equi_ext, car_priceday, car_carstate_id, car_usr_id)
VALUES ('23-45-AB','Audi', 'A1','2019','95hp','25TFSI','Petrol','5m','FWD','5','5','335L','AC;Heated Seats;Bluetooth Radio; Led Headlights;Cruise Controll','120','1','2');
INSERT INTO carimage (carimage_link, carimage_car_id) VALUES ('https://media.discordapp.net/attachments/1094210400469397614/1095432056999268352/Audi_A1_2.jpg?width=1246&height=701',4);
INSERT INTO carimage (carimage_link, carimage_car_id) VALUES ('https://media.discordapp.net/attachments/1094210400469397614/1095432057632608316/Audi_A1_1.jpg?width=1246&height=701',4);

INSERT INTO carservices(carservices_type, carservices_due,carservices_car_id) VALUES ('inspection','2023-10-04',4);
INSERT INTO carservices(carservices_type, carservices_due,carservices_car_id) VALUES ('insurance','2023-10-25',4);

INSERT INTO rent(rent_data_inicio, rent_data_final, rent_car_id, rent_usr_id, rent_rentstate_id) VALUES ('2023-07-25','2023-07-31',4,7,1);

INSERT INTO car (car_licenseplate, car_brand, car_model, car_year, car_bhp, car_engine, car_fuel, car_gearbox, car_drivetrain, car_doors, car_seats, car_bootcapacity, car_equi_ext, car_priceday, car_carstate_id, car_usr_id)
VALUES ('85-IT-23','Ford', 'Smax','2012','140hp','2.0TDCi','Diesel','6m','FWD','5','5','465L','AC;Heated Seats;Bluetooth Radio; Led Headlights;Cruise Controll','80','1','2');
INSERT INTO carimage (carimage_link, carimage_car_id) VALUES ('https://media.discordapp.net/attachments/1094210400469397614/1095442367668035644/ford_Smax2.jpg?width=1246&height=701',5);
INSERT INTO carimage (carimage_link, carimage_car_id) VALUES ('https://media.discordapp.net/attachments/1094210400469397614/1095442368116838511/ford_Smax1.jpg?width=1246&height=701',5);


INSERT INTO carservices(carservices_type, carservices_due,carservices_car_id) VALUES ('inspection','2023-09-12',5);
INSERT INTO carservices(carservices_type, carservices_due,carservices_car_id) VALUES ('insurance','2023-09-13',5);



INSERT INTO car (car_licenseplate, car_brand, car_model, car_year, car_bhp, car_engine, car_fuel, car_gearbox, car_drivetrain, car_doors, car_seats, car_bootcapacity, car_equi_ext, car_priceday, car_carstate_id, car_usr_id)
VALUES ('72-PO-08','Opel', 'Astra','2004','100hp','1.7CDTI','Diesel','5m','FWD','5','5','380L','AC;Heated Seats;Bluetooth Radio; Led Headlights;Cruise Controll','60','1','2');
INSERT INTO carimage (carimage_link, carimage_car_id) VALUES ('https://media.discordapp.net/attachments/1094210400469397614/1095444619552108635/opel_astra2.jpg?width=1246&height=701',6);
INSERT INTO carimage (carimage_link, carimage_car_id) VALUES ('https://media.discordapp.net/attachments/1094210400469397614/1095444620047032440/opel_astra1.jpg?width=1246&height=701',6);

INSERT INTO carservices(carservices_type, carservices_due,carservices_car_id) VALUES ('inspection','2023-07-25',6);
INSERT INTO carservices(carservices_type, carservices_due,carservices_car_id) VALUES ('insurance','2023-07-25',6);



--FINISHED RENTS
-- uma rent tem vários pontos em cada dia,um ponto é inserido a cada 30 segundos
--para questão de facilitar 10 min por dia de condução
--rents

--rentroutes

INSERT INTO rentroute (rr_geom, rr_rent_id) VALUES
();
INSERT INTO rentroute (rr_geom, rr_rent_id) VALUES
();
INSERT INTO rentroute (rr_geom, rr_rent_id) VALUES
();


















INSERT INTO Allowed_map (am_geom) VALUES
(ST_GeographyFromText(
    'SRID=4326;
    POLYGON((
    -9.1600575423017 38.70357496264694,
    -9.1561866290659 38.70540004468239,
    -9.152795382859352 38.705767006961594,
    -9.151932385393167 38.70589354992566,
    -9.152170786746723 38.70718591383758,
    -9.15339017549087 38.71125897200574,
    -9.154040982939847 38.712281110618534,
    -9.156257337535209 38.71276133477909,
    -9.16227635838672 38.70914837832751,
    -9.161536324998451 38.70714615258041,
    -9.162433107613538 38.70704050063898,
    -9.161991353661875 38.70584524902077,
    -9.1600575423017 38.70357496264694))'));

--nostopZones
Insert into no_stopzones(NS_geom)VALUES
(ST_GeographyFromText(
    'SRID=4326;
    LINESTRING(
    -9.158268835834804 38.70661055116773,
    -9.157437537153044 38.70704827819546,
    -9.156028456963753 38.70751325296894,
    -9.15451664938064 38.707918482236664,
    -9.152939100841394 38.70835676110465
        )'));
Insert into no_stopzones(NS_geom)VALUES
(ST_GeographyFromText(
    'SRID=4326;
    LINESTRING(
    -9.158694513051842 38.710876117883544,
    -9.15770024206469 38.710238662572806,
    -9.156492245211922 38.70956065533886
    )'));

Insert into no_stopzones(NS_geom)VALUES
(ST_GeographyFromText(
    'SRID=4326;
    LINESTRING(
    -9.157122773424874 38.709950951288846,
    -9.15696052463204 38.7101126118512,
    -9.156956049450258 38.71018460704542,
    -9.15708968419682 38.71026871535122,
    -9.156751185428163 38.71068807820453,
    -9.156647245499585 38.71067899498988,
    -9.155722735687135 38.70988223367726,
    -9.15576699056058 38.70957253353714
    )'));
    Insert into no_stopzones(NS_geom)VALUES
(ST_GeographyFromText(
    'SRID=4326;
    LINESTRING(
    -9.157684746451906 38.71020222391397,
    -9.15868188397792 38.709642415549496,
    -9.159841929772938 38.709018669455816,
    -9.161417039945917 38.70821755096358,
    -9.16158615810076 38.70813966676934
    )'));
        Insert into no_stopzones(NS_geom)VALUES
(ST_GeographyFromText(
    'SRID=4326;
    LINESTRING(
        -9.16119879029256 38.70704742729208,
        -9.158674522321803 38.70808462967696,
        -9.15808513467428 38.70827152328948,
        -9.157837778212837 38.70829980776085,
        -9.157526397378149 38.708340268104365,
        -9.156994364356848 38.70844232918648,
        -9.15621841312813  38.708712106028884,
        -9.154770562175003 38.70943753243273
    )'));
Insert into no_stopzones(NS_geom)VALUES
    (ST_GeographyFromText(
    'SRID=4326;
    LINESTRING(
        -9.162238228812441 38.70691249482118,
        -9.161855975434435 38.70597212594501,
        -9.161690140043476 38.705548728260226,
        -9.161352671329865 38.70503765837745,
        -9.159694272263778 38.7058170245341,
        -9.159315092782663 38.70600756448192,
        -9.159136091523067 38.70607032229199,
        -9.158264572655668 38.70661253792659
    )'));
Insert into no_stopzones(NS_geom)VALUES
(ST_GeographyFromText(
'SRID=4326;
LINESTRING(
    -9.160290048596181 38.71006732375022,
    -9.158672808971545 38.70811336637854
)'));
Insert into no_stopzones(NS_geom)VALUES
(ST_GeographyFromText(
'SRID=4326;
LINESTRING(
-9.15648342505088 38.70955467615099,
-9.155756025590023 38.70957259771683,
-9.15518908624847 38.7095224291146,
-9.154778371082955 38.70943651099978
)'));
Insert into no_stopzones(NS_geom)VALUES
(ST_GeographyFromText(
'SRID=4326;
LINESTRING(
-9.158662078312432 38.708093572528014,
-9.158297534458626 38.70730153166619,
-9.158145325266474 38.70698819095779,
-9.157892051315457 38.706670279217434,
-9.157732493201877 38.706561604570965,
-9.156942838946634 38.706529581688585,
-9.15655829708615 38.70655474056446,
-9.15607029401113 38.70662572024057,
-9.155808042746571 38.70668533982601,
-9.153890280887651 38.707671958792304,
-9.153775040528643 38.70767427616988
)'));
Insert into no_stopzones(NS_geom)VALUES
(ST_GeographyFromText(
'SRID=4326;
LINESTRING(
-9.155295477635178 38.7068999903301,
-9.155073094093467 38.706593025339146,
-9.15497020417601 38.706519601200654,
-9.154875908146863 38.70642846792498
)'));
Insert into no_stopzones(NS_geom)VALUES
(ST_GeographyFromText(
'SRID=4326;
LINESTRING(
-9.15517067663086 38.70680610657175,
-9.155023046140059 38.706681361103534,
-9.1549515283005 38.70660936512098,
-9.15495343602629 38.706511453540315
)'));
Insert into no_stopzones(NS_geom)VALUES
(ST_GeographyFromText(
'SRID=4326;
LINESTRING(
-9.15526575256635 38.70679136258423,
-9.155273807618272 38.706658379311364,
-9.155364365023928 38.70654808292173
)'));
Insert into no_stopzones(NS_geom)VALUES
(ST_GeographyFromText(
'SRID=4326;
LINESTRING(
-9.159832411887578 38.70457196049239,
-9.1582406487816 38.705323586272925,
-9.156866933255145 38.70599117320256,
-9.155588694204255 38.7064723157616,
-9.154541229418328 38.70663323294701,
-9.153343022302977 38.706587889171345,
-9.152920950836204 38.70658288449124
)'));