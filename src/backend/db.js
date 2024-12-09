const sql = require('mssql');

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};

let pool;

async function getDbPool() {
    if (!pool) {
        try {
            console.log('Connecting to the database...');
            pool = await sql.connect(dbConfig); // Establece la conexión
        } catch (err) {
            console.error('Error connecting to the database:', err);
            throw err; // Asegúrate de lanzar el error si la conexión falla
        }
    }
    return pool;
}

module.exports = { getDbPool };