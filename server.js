const express = require('express');
const path = require('path');
const app = express();

// port proporcionate to render o localhost
const PORT = process.env.PORT || 3000;

// get statics files from angular
app.use(express.static(path.join(__dirname, 'dist/front-end')));

// all routes should be get all index.html
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/front-end/index.html'));
});

// get post from render or localhost
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
