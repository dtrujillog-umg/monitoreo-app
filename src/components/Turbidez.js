// src/components/Turbidez.js
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import 'chartjs-plugin-zoom';

Chart.register(...registerables);

const Turbidez = () => {
  const [turbidezData, setTurbidezData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/turbidez');
        const { turbidez } = response.data;

        setTurbidezData(prev => [...prev, turbidez].slice(-10)); // Mantenemos solo las últimas 10 lecturas
      } catch (error) {
        console.error('Error fetching turbidez data:', error);
      }
    };

    const intervalId = setInterval(fetchData, 1000); // Actualizar cada 1000 ms (1 segundo)
    return () => clearInterval(intervalId);
  }, []);

  const createChartData = () => ({
    labels: Array.from({ length: turbidezData.length }, (_, i) => i + 1),
    datasets: [
      {
        label: 'Turbidez (NTU)',
        data: turbidezData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
      },
    ],
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Datos de Turbidez',
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'xy',
        },
        zoom: {
          enabled: true,
          mode: 'xy',
        },
      },
    },
    scales: {
      x: {
        type: 'linear',
        beginAtZero: true,
      },
      y: {
        beginAtZero: false,
        ticks: {
          callback: function(value) {
            return value.toFixed(2); // Formato de 2 decimales
          },
        },
      },
    },
  };

  return (
    
    <div style={{ width: "50%", height: "auto" }}> {/* Corrige aquí */}
      <h2>Turbidez</h2>
      <Line options={options} data={createChartData()} />
    </div>
  );
};

export default Turbidez;
