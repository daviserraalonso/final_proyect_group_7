const express = require('express');
const path = require('path');
const app = express();

// Usa el puerto proporcionado por Render o el puerto 3000 como fallback en local
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos de Angular
app.use(express.static(path.join(__dirname, 'dist/front-end')));

// Todas las rutas deben servir el index.html de Angular
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/front-end/index.html'));
});

// Iniciar el servidor en el puerto asignado por Render
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
