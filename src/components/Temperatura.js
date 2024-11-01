// src/components/BME280.js
import React from 'react';
import TemperaturaChart from './TemperaturaChart';

const BME280 = () => {
    return (
        <div style={{ width: "50%", height: "auto" }}> {/* Corrige aquí */}
            <h2>Sensor de Temperatura</h2>
            <p>Detalles y visualización de datos del sensor de Temperatura.</p>
            <TemperaturaChart />
        </div>
    );
};

export default BME280;
