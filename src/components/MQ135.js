// src/components/MQ135.js
import React from 'react';
import MQ135Chart from './MQ135Chart';

const MQ135 = () => {
    return (
        <div style={{ width: "50%", height: "auto" }}> {/* Corrige aquí */}
            <h2>MQ135 Sensor</h2>
            <p>Details and data visualization for MQ135 sensor.</p>
            <MQ135Chart/>
        </div>
    );
};

export default MQ135;
