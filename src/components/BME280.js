// src/components/BME280.js
import React from 'react';
import BME280Chart from './BME280Chart';

const BME280 = () => {
    return (
        <div style={{ width: "50%", height: "auto" }}> {/* Corrige aquí */}
            <h2>BME280 Sensor</h2>
            <p>Detalles y visualización de datos del sensor BME280.</p>
            <BME280Chart />
        </div>
    );
};

export default BME280;
