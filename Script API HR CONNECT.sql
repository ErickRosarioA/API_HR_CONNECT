CREATE DATABASE ApiHRConnect1
USE ApiHRConnect1

-- Crear tabla de Departamento
CREATE TABLE Departamentos(
    ID INT IDENTITY(1,1) PRIMARY KEY ,
    Descripcion VARCHAR(50),	
);

CREATE TABLE TiposDocumentos (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    TipoDocumento VARCHAR(50)
);

CREATE TABLE Roles
(
    ID INT  IDENTITY(1,1) PRIMARY KEY,
    Descripcion VARCHAR(50),	
);

-- Crear tabla de usuarios
CREATE TABLE Usuarios (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    NombreUsuario VARCHAR(50),
    Clave VARCHAR(100),
    RolID INT,
	FOREIGN KEY (RolID) REFERENCES Roles(ID)
);
-- Crear tabla de empleados
CREATE TABLE Empleados (
    ID INT IDENTITY(1,1) PRIMARY KEY,
	DepartamentoID INT,
	TipoDocumentoID INT,
    Nombre VARCHAR(100),
	Cedula VARCHAR(11) UNIQUE,
    FechaContratacion DATE,
	Direccion VARCHAR(100),
	Telefono VARCHAR(100),
	Celular VARCHAR(100),
    Salario DECIMAL(10, 2),
	Rutadocumento VARCHAR(MAX),
	FOREIGN KEY (DepartamentoID) REFERENCES Departamentos(ID),
	FOREIGN KEY (TipoDocumentoID) REFERENCES TiposDocumentos(ID)
);


-- Crear tabla de vacaciones
CREATE TABLE Vacaciones (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    EmpleadoID INT,
    FechaInicio DATE,
    FechaFin DATE,
    Aprobada BIT,
    FOREIGN KEY (EmpleadoID) REFERENCES Empleados(ID)
);

-- Crear tabla de licencias
CREATE TABLE Licencias (
    ID INT  IDENTITY(1,1) PRIMARY KEY,
    EmpleadoID INT,
    Tipo VARCHAR(50),
    FechaInicio DATE,
    FechaFin DATE,
    Comentarios TEXT,
    FOREIGN KEY (EmpleadoID) REFERENCES Empleados(ID)
);

INSERT INTO TiposDocumentos (TipoDocumento)
VALUES
    ('CV'),
    ('Certificados'),
    ('Títulos'),
    ('Otros');

INSERT INTO Departamentos(Descripcion)
VALUES
    ('Gestion Humana'),
    ('Tecnologia'),
    ('Contabilidad'),
    ('Administrativo');

INSERT INTO Roles(Descripcion)
VALUES
    ('Admin'),
    ('User');


-- Clave para logearse (admin123)
INSERT INTO Usuarios(NombreUsuario,Clave,RolID)
VALUES
('Administrador','$2a$10$rTmZ2wRkRvcEPSgazJNDvuldtHJCqKQuVfSuSyLyR7LwbqWz2V9Rq', 1 );
