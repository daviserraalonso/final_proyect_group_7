const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());

// Route to get node version
app.get('/api/node-version', (req, res) => {
  res.json({ version: process.version });
});

app.use(express.static(path.join(__dirname, 'dist/front-end/browser')));

// to other route, get index.html from Angular
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/front-end/browser/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
