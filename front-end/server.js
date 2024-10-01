const express = require('express');
const path = require('path');
const app = express();

// Cambia la ruta estática para incluir el subdirectorio 'browser'
app.use(express.static(path.join(__dirname, 'dist/front-end/browser')));

// Cambia la ruta del archivo index.html
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/front-end/browser/index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
