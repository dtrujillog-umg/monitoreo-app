// src/components/DHT11Chart.js
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import 'chartjs-plugin-zoom';

Chart.register(...registerables);

const DHT11Chart = () => {
  const [temperaturaData, setTemperaturaData] = useState([]);
  const [humedadData, setHumedadData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dht11');
        const { temperatura, humedad } = response.data; // Accede correctamente a los datos de temperatura y humedad

        setTemperaturaData(prev => [...prev, temperatura].slice(-10)); // Mantenemos solo las últimas 10 lecturas
        setHumedadData(prev => [...prev, humedad].slice(-10)); // Mantenemos solo las últimas 10 lecturas
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const intervalId = setInterval(fetchData, 1000); // Actualizar cada 1000 ms (1 segundo)
    return () => clearInterval(intervalId);
  }, []);

  const createChartData = (label, data, color) => ({
    labels: Array.from({ length: data.length }, (_, i) => i + 1),
    datasets: [
      {
        label,
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
        text: 'Datos del Sensor DHT11',
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
      <Line options={options} data={createChartData('Temperatura (°C)', temperaturaData, 'rgba(255, 99, 132, 1)')}
       />
      
      <h2>Humedad</h2>
      <Line options={options} data={createChartData('Humedad (%)', humedadData, 'rgba(54, 162, 235, 1)')} />
    </div>
  );
};

export default DHT11Chart;
