const sql = require('mssql');

// Configuración de SQL Server
const masterConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT, 10),
    options: {
      encrypt: true,
      trustServerCertificate: true,
    },
  };

const dbConfig = {
    ...masterConfig,
    database: 'credicorp',
};

const createTablesScript = `
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Tasks')
BEGIN
    CREATE TABLE Tasks (
        id INT IDENTITY(1,1) PRIMARY KEY,
        title NVARCHAR(255) NOT NULL,
        completed BIT NOT NULL DEFAULT 0,
        created_at DATETIME NOT NULL DEFAULT GETDATE(),
        updated_at DATETIME NULL
    );
END;
`;

async function initDatabase() {
    let pool;

    try {
        console.log('Connecting to SQL Server...');
        // Conecta al servidor (sin especificar base de datos)
        pool = await sql.connect(masterConfig);
        
        console.log('Connecting to database...');
        pool = await sql.connect(dbConfig);

        console.log('Checking and creating tables...');
        await pool.request().query(createTablesScript);

        console.log('Database and tables are ready.');
    } catch (err) {
        console.error('Error initializing database:', err);
    } finally {
        await sql.close();
    }
}

module.exports = initDatabase;