// src/components/NavigationDrawer.js
import React, { useState } from 'react';
import {
    Drawer,
    AppBar,
    Toolbar,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    IconButton,
    Typography,
    Divider,
    Box,
    Switch,
} from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import BarChartIcon from '@mui/icons-material/BarChart';
import AirIcon from '@mui/icons-material/Air';
import CloudIcon from '@mui/icons-material/Cloud';
import WaterIcon from '@mui/icons-material/Water'; // Icono para el nuevo componente de turbidez
import WhatshotIcon from '@mui/icons-material/Whatshot'; // Icono para el nuevo componente

const drawerWidth = 280;

const NavigationDrawer = ({ onToggleTheme, darkMode }) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar>
                <Typography variant="h6" noWrap>
                    My App
                </Typography>
            </Toolbar>
            <Divider />
            <List>
                {[
                    { text: 'Home', icon: <HomeIcon />, route: '/' },
                    { text: 'BME280', icon: <CloudIcon />, route: '/bme280' },
                    { text: 'DHT11', icon: <ThermostatIcon />, route: '/dht11' },
                    { text: 'MQ9', icon: <BarChartIcon />, route: '/mq9' },
                    { text: 'MQ135', icon: <AirIcon />, route: '/mq135' },
                    { text: 'Temperatura', icon: <WhatshotIcon />, route: '/temperatura' },
                    { text: 'Turbidez', icon: <WaterIcon />, route: '/turbidez' }, // Nuevo ítem
                ].map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton component={Link} to={item.route}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
                <Typography variant="body1" sx={{ flexGrow: 1 }}>
                    {darkMode ? 'Dark Mode' : 'Light Mode'}
                </Typography>
                <Switch checked={darkMode} onChange={onToggleTheme} />
            </Box>
        </div>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        My App
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                    display: { xs: 'none', sm: 'block' },
                }}
                open
            >
                {drawer}
            </Drawer>
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                {drawer}
            </Drawer>
        </Box>
    );
};

export default NavigationDrawer;
