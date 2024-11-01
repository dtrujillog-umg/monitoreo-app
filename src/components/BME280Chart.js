import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import 'chartjs-plugin-zoom';

Chart.register(...registerables);

const BME280Chart = () => {
  const [presionData, setPresionData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/bme280');
        const { presion } = response.data; // Asegúrate de que solo estás obteniendo presión

        setPresionData(prev => [...prev, presion]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const intervalId = setInterval(fetchData, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const data = {
    labels: Array.from({ length: presionData.length }, (_, i) => i + 1),
    datasets: [
      {
        label: 'Presión (hPa)',
        data: presionData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Datos del Sensor BME280',
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
            return value.toFixed(2);
          },
        },
      },
    },
  };

  return <Line options={options} data={data} />;
};

export default BME280Chart;
