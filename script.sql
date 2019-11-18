DROP DATABASE IF EXISTS vluaDB;

CREATE DATABASE vluaDB;

USE vluaDB;

INSERT INTO 
	`Gender`
VALUES
	( 'd8503e02-eca0-4b3a-ad93-b6795974b362', 'Masculino', 'Activo' ),
	( '15418620-63d8-458c-bf70-5caede1a948d', 'Femenino', 'Activo' ),
	( '4939e9ad-f8e9-46bf-90ec-6884706a3d58', 'Transgenero', 'Activo' );
	
INSERT INTO 
	`TypeDoc`
VALUES
	( 'bf4f7f8c-9f77-4e8d-bcdb-d4298d404477', 'Cédula de Ciudadanía', 'Activo' ),
	( 'c4f3f3f7-042d-4497-8a95-16e3370b0bf0', 'Tarjeta de Identidad', 'Activo' ),
	( '3869884a-887c-44c4-97dd-e7f701984d11', 'Cédula de Extranjería', 'Activo' ),
	( '28c10c2b-8b90-4e93-8704-badeb5db5c67', 'Pasaporte', 'Activo' );
	
INSERT INTO 
	`Role`
VALUES
	( 'c0d8e5d9-105c-400d-9a81-b2ab77b41c46', 'Estudiante', 'Activo' ),
	( '42455ae9-47dc-4c3c-b660-a873df39e21f', 'Docente', 'Activo' ),
	( '24fc8de3-17cf-4976-ae07-689ca0b31dfa', 'Administrativo', 'Activo' ),
	( 'a39e9a0b-e05e-4266-a15c-26c058decb58', 'Bibliotecario', 'Activo' );
	
INSERT INTO 
	`Category`
VALUES
	( '3def8e46-ecd7-428d-974a-752eecfcc4cd', '000', 'Generalidades ', 'Activo' ),
	( '3e59f0cc-263d-4e0b-9124-9cf345ebd5f4', '100', 'Filosofía & psicología ', 'Activo' ),
	( 'aea30536-fc59-414f-9747-8649eb1b81fd', '200', 'Religión ', 'Activo' ),
	( '06abd721-1a2d-49d3-b80b-f8c3ceecddb3', '300', 'Ciencias sociales ', 'Activo' ),
	( '29c5eee4-578b-4487-9840-a58f18674790', '400', 'Lenguas ', 'Activo' ),
	( '950d9c32-415d-4fb7-8b27-cf91d26a1215', '500', 'Ciencias naturales & matemáticas', 'Activo' ),
	( '912b1be9-43c0-4a3e-9a82-147e962b5a61', '600', 'Tecnología (Ciencias aplicadas) ', 'Activo' ),
	( '6a904129-aa60-4143-adc7-5470ed5a494b', '700', 'Las artes', 'Activo' ),
	( '94bb1f81-086f-4290-875b-624947b4e66d', '800', 'Literatura & retórica ', 'Activo' ),
	( '44cf413f-5d4f-4b12-bb95-b839f31dccf5', '900', 'Geografía & historia', 'Activo' );
	
INSERT INTO 
	`People`
VALUES
	( '49172f13-2558-4852-9d4e-6e08f6299850', 'Julio', 'Alfredo', 'Vasquez', 'Lievano', '1996-02-22', 1117542316, 'Activo', 'd8503e02-eca0-4b3a-ad93-b6795974b362' ),
	( '4c71bacd-5720-4ce3-8407-a8203825d65f', 'Juan', 'Rodrigo', 'Fernadez', 'Agudelo', '1990-05-23', 1150327933, 'Activo', 'd8503e02-eca0-4b3a-ad93-b6795974b362' ),
	( '973135eb-3d1a-48ea-9016-6a6fbb7800d4', 'Luis', 'Enrrique', 'Jurado', 'Martinez', '1977-03-28', 1551443680, 'Activo', 'd8503e02-eca0-4b3a-ad93-b6795974b362' ),
	( '1467d83d-ad9f-437b-9073-0b430ff372c0', 'Maria', 'Luisa', 'Uribe', 'Zapata', '1994-12-01', 1133569420, 'Activo', '15418620-63d8-458c-bf70-5caede1a948d' ),
	( '51cce31c-47ac-479c-9da8-c457bf6e09f7', 'Juana', 'Camila', 'Camargo', 'Lopera', '1997-09-25', 1400174019, 'Activo', '15418620-63d8-458c-bf70-5caede1a948d' ),
	( '1a485ac2-3b1d-4de8-97c4-7765123e38c4', 'Marlon', 'Jose', 'Duarte', 'Tovar', '1991-08-05', 428735074, 'Activo', 'd8503e02-eca0-4b3a-ad93-b6795974b362' ),
	( '3e79a1b4-9727-4dc9-aa8a-3f1b87e858d6', 'Melany', 'Sofia', 'Roa', 'Camacho', '1997-03-22', 1566064171, 'Activo', '15418620-63d8-458c-bf70-5caede1a948d' ),
	( '889c48b8-2ffc-4791-972e-d015b243cfac', 'Juan', 'Enrique', 'Vasquez', 'Anacona', '1984-12-12', 1858756120, 'Activo', 'd8503e02-eca0-4b3a-ad93-b6795974b362' ),
	( '38243365-576e-471f-8486-583499b77ac2', 'Luz', 'Edith', 'Jojoa', 'Armani', '1999-05-12', 401083433, 'Activo', '15418620-63d8-458c-bf70-5caede1a948d' ),
	( '76566756-3f97-4ef2-ac77-4fadffcd351b', 'Leonel', 'Camilo', 'Lupaco', 'Suarez', '1997-03-22', 1363128645, 'Activo', 'd8503e02-eca0-4b3a-ad93-b6795974b362' ),
	( 'd27118d2-4ed1-462e-9797-740afac60902', 'Luisa', 'Fernana', 'Apache', 'Segura', '1995-12-02', 1035258692, 'Activo', '15418620-63d8-458c-bf70-5caede1a948d' ),
	( '728a2924-56e0-4bc3-8cf1-ffd0b7355f21', 'Felix', 'Santiago', 'Moncada', 'Arias', '2000-02-02', 675369411, 'Activo', 'd8503e02-eca0-4b3a-ad93-b6795974b362' ),
	( 'b959e6a0-114a-4cbc-83ee-2a4c1e5f2f8b', 'Juana', 'Isabel', 'Lievano', 'Matiz', '1995-05-15', 673921759, 'Activo', '15418620-63d8-458c-bf70-5caede1a948d' ),
	( '50509d80-14bb-40db-bc04-634d721af33d', 'Marcos', '', 'Iriarte', 'Vera', '1969-08-17', 1682033328, 'Activo', 'd8503e02-eca0-4b3a-ad93-b6795974b362' ),
	( '735b17ca-d1a5-4c63-b2ab-89c91f6e00d4', 'Valeria', '', 'Espitia', 'Garcia', '1985-10-03', 124629956, 'Activo', '15418620-63d8-458c-bf70-5caede1a948d' ),
	( '92031da1-4250-476d-8a70-0a739a187398', 'Carlos', 'Francisco', 'Ruedo', 'Tamayo', '1991-11-09', 1207653160, 'Activo', 'd8503e02-eca0-4b3a-ad93-b6795974b362' ),
	( '3965b256-b83b-4a3b-ae83-8ff95d475862', 'Ana', 'Sofia', 'Dussan', 'Arias', '1996-03-30', 1639725671, 'Activo', '15418620-63d8-458c-bf70-5caede1a948d' ),
	( 'bf4eec83-1455-42f3-92e9-b7d95702cadf', 'Cristian', 'Enrique', 'Jaramillo', 'Salazar', '1970-01-05', 1937047879, 'Activo', 'd8503e02-eca0-4b3a-ad93-b6795974b362' ),
	( '7bafbe24-44c4-41ce-905d-6305685bbff6', 'Maria', 'Luisa', 'Santos', 'Mora', '1990-12-15', 1676031344, 'Activo', '15418620-63d8-458c-bf70-5caede1a948d' ),
	( 'c41bffd1-f234-490a-ad5d-8e0f90f1123a', 'Paloma', '', 'Hinestroza', 'Mena', '1994-08-04', 1437800920, 'Activo', '4939e9ad-f8e9-46bf-90ec-6884706a3d58' ),
	( '6c587855-8033-4944-9bbd-6f1e816a6c76', 'Briyit', 'Camila', 'Rincon', 'Oviedo', '1991-08-05', 261203907, 'Activo', '4939e9ad-f8e9-46bf-90ec-6884706a3d58' );
	
INSERT INTO 
	`User`
VALUES
	( '8958a8f6-0107-4d32-bf4b-2a31ba093be6', 'DarKPhuRioN', PASSWORD ( 'phurion123' ), 'Activo', '49172f13-2558-4852-9d4e-6e08f6299850', '24fc8de3-17cf-4976-ae07-689ca0b31dfa', 'bf4f7f8c-9f77-4e8d-bcdb-d4298d404477' );