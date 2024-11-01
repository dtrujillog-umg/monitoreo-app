// src/components/MQ9Chart.js
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import 'chartjs-plugin-zoom';

Chart.register(...registerables);

const MQ135Chart = () => {
    const [mq9AnalogicoData, setMq135AnalogicoData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/mq135'); // Asegúrate de que esta ruta sea correcta
                const { mq135_analogico } = response.data;

                setMq135AnalogicoData(prev => [...prev, mq135_analogico]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const intervalId = setInterval(fetchData, 1000);
        return () => clearInterval(intervalId);
    }, []);

    // Función para crear datos del gráfico
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
                text: 'Datos del Sensor MQ135',
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
                type: 'linear', // Si usas datos numéricos en el eje X
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
            {/* <h2>MQ9 Analógico</h2> */}
            <Line options={options} data={createChartData('MQ9 Analógico', mq9AnalogicoData, 'rgba(255, 99, 132, 1)')} />
        </div>
    );
};

export default MQ135Chart;
