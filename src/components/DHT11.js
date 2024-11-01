// src/components/DHT11Component.js
import React, { useEffect, useState } from 'react';
import DHT11Chart from './DHT11Chart';
import axios from 'axios';

const DHT11Component = () => {
  const [temperatura, setTemperatura] = useState(null);
  const [humedad, setHumedad] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dht11');
        const { temperatura, humedad } = response.data;

        setTemperatura(temperatura);
        setHumedad(humedad);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const intervalId = setInterval(fetchData, 1000); // Actualizar cada segundo
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h2>DHT11 Sensor</h2>
      {temperatura !== null && humedad !== null ? (
        <div>
          <p>Temperatura: {temperatura} °C</p>
          <p>Humedad: {humedad} %</p>
        </div>
      ) : (
        <p>Cargando datos...</p>
      )}
       <div style={{ width: "50%", height: "auto" }}> {/* Corrige aquí */}
        <DHT11Chart temperatura={temperatura} humedad={humedad} />
      </div>
    </div>
  );
};

export default DHT11Component;
