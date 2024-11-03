// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline, useMediaQuery } from '@mui/material';
import NavigationDrawer from './components/NavigationDrawer';
import BME280 from './components/BME280';
import DHT11 from './components/DHT11';
import MQ9 from './components/MQ9';
import MQ135 from './components/MQ135';
import Temperatura from './components/Temperatura';
import Turbidez from './components/Turbidez';
import Login from './components/login';
import Mantenimiento from './components/Mantenimiento'; // Asegúrate de importar tu componente
import AdministracionUsuarios from './components/AdministracionDeUsuarios'; // Asegúrate de importar tu componente

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [token, setToken] = useState(sessionStorage.getItem('token')); // Almacenar el token en el estado

    const isLargeScreen = useMediaQuery('(min-width:600px)');
    const drawerWidth = isLargeScreen ? 280 : 0;

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
        },
    });

    const handleToggleTheme = () => {
        setDarkMode(!darkMode);
    };

    const handleLogin = (token) => {
        setToken(token);
        sessionStorage.setItem('token', token); // Guardar token en session storage
    };

    const handleLogout = () => {
        setToken(null);
        sessionStorage.removeItem('token'); // Eliminar token de session storage
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <NavigationDrawer onToggleTheme={handleToggleTheme} darkMode={darkMode} onLogout={handleLogout} />
                <main
                    style={{
                        padding: 24,
                        marginLeft: drawerWidth,
                        transition: 'margin 0.3s ease-in-out',
                    }}
                >
                    <br />
                    <Routes>
                        {/* Rutas que pueden ser accedidas por cualquier usuario */}
                        <Route path="/bme280" element={<BME280 />} />
                        <Route path="/dht11" element={<DHT11 />} />
                        <Route path="/mq9" element={<MQ9 />} />
                        <Route path="/mq135" element={<MQ135 />} />
                        <Route path="/temperatura" element={<Temperatura />} />
                        <Route path="/turbidez" element={<Turbidez />} />
                        <Route path="/" element={<h1>Welcome to My App</h1>} />

                        {/* Rutas restringidas, que requieren autenticación */}
                        <Route path="/mantenimiento" element={token ? <Mantenimiento /> : <Navigate to="/login" />} />
                        <Route path="/administracion" element={token ? <AdministracionUsuarios /> : <Navigate to="/login" />} />

                        {/* Ruta para login */}
                        <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    </Routes>
                </main>
            </Router>
        </ThemeProvider>
    );
}

export default App;
