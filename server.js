const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());  // Asegúrate de que esta línea esté presente
app.use(express.json());

app.get('/api/node-version', (req, res) => {
  res.json({ version: process.version });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
