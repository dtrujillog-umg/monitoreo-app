// src/components/MQ9.js
import React from 'react';
import MQ9Chart from './MQ9Chart'; // Asegúrate de importar el componente MQ9Chart

const MQ9 = () => {
    return (
        <div style={{ width: "50%", height: "auto" }}> {/* Corrige aquí */}
            <h2>MQ9 Sensor</h2>
            <p>Details and data visualization for MQ9 sensor.</p>
            <MQ9Chart /> {/* Añade el componente para mostrar los gráficos */}
        </div>
    );
};

export default MQ9;
