-- Crear la tabla Tasks
CREATE TABLE Tasks (
    id INT IDENTITY(1,1) PRIMARY KEY, -- Identificador único autoincremental
    title NVARCHAR(255) NOT NULL,    -- Título de la tarea
    completed BIT NOT NULL DEFAULT 0, -- Estado de la tarea (0 = Pendiente, 1 = Completada)
    created_at DATETIME NOT NULL DEFAULT GETDATE(), -- Fecha de creación
    updated_at DATETIME NULL -- Fecha de última actualización
);