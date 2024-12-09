require("dotenv").config();
const initDatabase = require('./initDatabase');
const { getDbPool } = require('./db');
const express = require("express");
const bodyParser = require("body-parser");
const sql = require("mssql");
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ruta: Obtener todas las tareas
app.get("/tasks", async (req, res) => {
  try {
    const pool = await getDbPool();
    const result = await pool.request().query("SELECT * FROM Tasks ORDER BY created_at DESC");
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

// Ruta: Crear una nueva tarea
app.post("/tasks", async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).send("Title is required");

  try {
    const pool = await getDbPool();
    const result = await pool.request()
      .input("title", sql.NVarChar, title)
      .query("INSERT INTO Tasks (title) OUTPUT INSERTED.* VALUES (@title)");
    res.status(201).json(result.recordset[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

// Ruta: Actualizar el estado de una tarea
app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const pool = await getDbPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .input("completed", sql.Bit, completed)
      .query("UPDATE Tasks SET completed = @completed WHERE id = @id");
    res.sendStatus(result.rowsAffected[0] > 0 ? 200 : 404);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

// Ruta: Eliminar una tarea
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await getDbPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .query("DELETE FROM Tasks WHERE id = @id");
    res.sendStatus(result.rowsAffected[0] > 0 ? 200 : 404);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

app.get("/tasks/stats", async (req, res) => {
  try {
    const pool = await getDbPool(); // Obtén el pool de conexiones
    const result = await pool.request().query("SELECT * FROM Tasks"); // Obtén todas las tareas

    const tasks = result.recordset; // Las tareas obtenidas de la base de datos

    const completedTasks = tasks.filter(task => task.completed).length;
    const pendingTasks = tasks.filter(task => !task.completed).length;

    res.json({ completedTasks, pendingTasks });
  } catch (err) {
    console.error('Error en /tasks/stats:', err);  // Log para más detalles
    res.status(500).json({ message: 'Error interno del servidor', error: err.message });
  }
});

(async () => {
  await initDatabase(); // Inicializa la base de datos
  app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
  });
})();