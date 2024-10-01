const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'dist/front-end')));  // Asegúrate de que 'front-end' esté bien escrito

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/front-end/index.html'));  // Usa 'front-end'
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT || 3000}`);
});
