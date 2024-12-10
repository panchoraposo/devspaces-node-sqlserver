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
            pool = await sql.connect(dbConfig);
        } catch (err) {
            console.error('Error connecting to the database:', err);
            throw err;
        }
    }
    return pool;
}

module.exports = { getDbPool };