import React, { useEffect, useState } from 'react';
import './App.css';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Cargando tareas...');
    fetch('http://localhost:3000/tasks')
      .then(response => response.json())
      .then(data => {
        console.log('Tareas recibidas:', data);
        setTasks(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al cargar tareas:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  if (error) {
    return <div className="error">Error al cargar las tareas: {error}</div>;
  }

  return (
    <div className="container">
      <h1>Task List Microfrontend</h1>
      <ul>
        {tasks.length > 0 ? (
          tasks.map(task => (
            <li key={task.id} className={task.completed ? 'completed' : ''}>
              <span>{task.title}</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleComplete(task.id, task.completed)}
                />
                <span className="slider"></span>
              </label>
            </li>
          ))
        ) : (
          <p>No hay tareas disponibles</p>
        )}
      </ul>
    </div>
  );

  function handleToggleComplete(id, completed) {
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed }),
    })
      .then(response => response.ok && setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !completed } : task))))
      .catch(error => console.error('Error al actualizar la tarea:', error));
  }
}

export default TaskList;