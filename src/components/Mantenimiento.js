// src/components/Mantenimiento.js
import React, { useEffect, useState } from 'react';

const Mantenimiento = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true); // Cambia el estado si hay un token
        }
    }, []);

    if (!isAuthenticated) {
        return <h1>Por favor, inicia sesión para acceder a esta sección.</h1>;
    }

    return <h1>Mantenimiento</h1>;
};

export default Mantenimiento;
