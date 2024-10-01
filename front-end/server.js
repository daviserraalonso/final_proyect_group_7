const express = require('express');
const path = require('path');
const app = express();

// Asegúrate de que la ruta estática se ajuste a la nueva ubicación
app.use(express.static(path.join(__dirname, 'dist/front-end')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/front-end/index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
