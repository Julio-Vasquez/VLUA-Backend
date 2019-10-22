CREATE DATABASE vluadb;

use vluadb;

INSERT INTO Gender VALUES
('d8503e02-eca0-4b3a-ad93-b6795974b362', 'Masculino', 'Activo'),
('15418620-63d8-458c-bf70-5caede1a948d', 'Femenino', 'Activo'),
('4939e9ad-f8e9-46bf-90ec-6884706a3d58', 'Transgenero', 'Activo');

INSERT INTO TypeDoc VALUES
('bf4f7f8c-9f77-4e8d-bcdb-d4298d404477', 'Cédula de Ciudadaníaania', 'Activo'),
('c4f3f3f7-042d-4497-8a95-16e3370b0bf0', 'Tarjeta de Identidad', 'Activo'),
('3869884a-887c-44c4-97dd-e7f701984d11', 'Cédula de Extranjería', 'Activo'),
('28c10c2b-8b90-4e93-8704-badeb5db5c67', 'Pasaporte', 'Activo');

INSERT INTO  Role VALUES
('c0d8e5d9-105c-400d-9a81-b2ab77b41c46', 'Estudiante', 'Activo'),
('42455ae9-47dc-4c3c-b660-a873df39e21f', 'Docente', 'Activo'),
('24fc8de3-17cf-4976-ae07-689ca0b31dfa', 'Administrativo', 'Activo'),
('a39e9a0b-e05e-4266-a15c-26c058decb58', 'Bibliotecario', 'Activo');

INSERT INTO Category VALUES
('a9bd4b61-b858-4c27-a744-8a235f55db42', 'Ciencias Humanas', 'Activo'),
('c8a9cdc2-0a5c-45c4-b8b4-88cdb94b35bf', 'Ciencias Naturales', 'Activo'),
('d2982724-3f09-4a8d-b0cc-6ebaf8fdd40e', 'Matemáticas', 'Activo'),
('9f284d58-3e37-4fec-81e4-bdfa2b0d4712', 'Tecnología', 'Activo');