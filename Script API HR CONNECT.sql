CREATE DATABASE ApiHRConnect
USE ApiHRConnect

CREATE TABLE Empleados (
    ID INT PRIMARY KEY,
    Nombre VARCHAR(100),
    Departamento VARCHAR(50),
    FechaContratacion DATE,
	Direccion VARCHAR(100),
	Telefono VARCHAR(100),
	Celular VARCHAR(100),
    Salario DECIMAL(10, 2)
);

-- Crear tabla de vacaciones
CREATE TABLE Vacaciones (
    ID INT PRIMARY KEY,
    EmpleadoID INT,
    FechaInicio DATE,
    FechaFin DATE,
    Aprobada BIT,
    FOREIGN KEY (EmpleadoID) REFERENCES Empleados(ID)
);

-- Crear tabla de licencias
CREATE TABLE Licencias (
    ID INT PRIMARY KEY,
    EmpleadoID INT,
    Tipo VARCHAR(50),
    FechaInicio DATE,
    FechaFin DATE,
    Comentarios TEXT,
    FOREIGN KEY (EmpleadoID) REFERENCES Empleados(ID)
);

-- Crear tabla de usuarios
CREATE TABLE Usuarios (
    ID INT PRIMARY KEY,
    NombreUsuario VARCHAR(50),
    Contraseña VARCHAR(100),
    Rol VARCHAR(20)
);
CREATE TABLE Documentos (
    ID INT PRIMARY KEY,
    EmpleadoID INT,
    NombreArchivo VARCHAR(100),
    TipoDocumentoID INT,
    Ruta VARCHAR(MAX),
    FOREIGN KEY (EmpleadoID) REFERENCES Empleados(ID),
	FOREIGN KEY (TipoDocumentoID) REFERENCES TiposDocumentos(ID)
);
CREATE TABLE TiposDocumentos (
    ID INT PRIMARY KEY,
    TipoDocumento VARCHAR(50)
);

INSERT INTO TiposDocumentos (ID, TipoDocumento)
VALUES
    (1, 'CV'),
    (2, 'Certificados'),
    (3, 'Títulos'),
    (4, 'Otros');