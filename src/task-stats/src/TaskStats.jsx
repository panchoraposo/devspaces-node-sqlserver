import React, { useState, useEffect } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Title, ArcElement, Tooltip, Legend } from "chart.js";

// Registrar los elementos necesarios de Chart.js
ChartJS.register(Title, ArcElement, Tooltip, Legend);

const TaskStats = () => {
  const [stats, setStats] = useState({ completedTasks: 0, pendingTasks: 0 });
  const [loading, setLoading] = useState(true);

  // Función para obtener las estadísticas
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:3000/tasks/stats");
        setStats(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener estadísticas de tareas:", error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Configuración del gráfico
  const data = {
    labels: ["Completadas", "Pendientes"], // Etiquetas de las porciones
    datasets: [
      {
        label: "Estadísticas de Tareas",
        data: [stats.completedTasks, stats.pendingTasks], // Datos de las tareas
        backgroundColor: ["#4caf50", "#ff9800"], // Colores actualizados (verde y naranja)
        borderColor: ["#388e3c", "#f57c00"], // Bordes del gráfico
        borderWidth: 2,
      },
    ],
  };

  // Opciones del gráfico
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Estadísticas de Tareas",
      },
    },
    // Tamaño más pequeño
    maintainAspectRatio: false,
    aspectRatio: 1,
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      {loading ? (
        <div>Cargando estadísticas...</div>
      ) : (
        <Doughnut data={data} options={options} height={250} />
      )}
    </div>
  );
};

export default TaskStats;