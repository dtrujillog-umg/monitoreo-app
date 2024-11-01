// src/components/TemperaturaChart.js
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import 'chartjs-plugin-zoom';

Chart.register(...registerables);

const TemperaturaChart = () => {
  const [temperaturaData, setTemperaturaData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/temperatura');
        const { temperatura } = response.data; // Accede correctamente a la temperatura

        setTemperaturaData(prev => [...prev, temperatura].slice(-10)); // Mantén solo las últimas 10 lecturas
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const intervalId = setInterval(fetchData, 1000); // Actualizar cada 1000 ms (1 segundo)
    return () => clearInterval(intervalId);
  }, []);

  const createChartData = (data, color) => ({
    labels: Array.from({ length: data.length }, (_, i) => i + 1),
    datasets: [
      {
        label: 'Temperatura (°C)',
        data,
        borderColor: color,
        backgroundColor: `${color}33`, // Color con transparencia
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
        text: 'Datos de Temperatura',
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
    <div>
      <h2>Temperatura</h2>
      <Line options={options} data={createChartData(temperaturaData, 'rgba(255, 99, 132, 1)')} />
    </div>
  );
};

export default TemperaturaChart;
