import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { Card, CardContent, Typography } from '@mui/material';

Chart.register(...registerables);

const ChartComponent = () => {
    const chartRef = useRef(null);

    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Sales',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: 'rgba(75,192,192,0.6)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    useEffect(() => {
        // Limpia el gráfico si ya existe uno
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, []);

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                    Sales Data
                </Typography>
                <Bar ref={chartRef} data={data} options={options} />
            </CardContent>
        </Card>
    );
};

export default ChartComponent;
