import express from 'express';
import cors from 'cors'; // cors import
import userRoutes from './routes/user.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Definir __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env['PORT'] || 4000;

// Configure cors from front
app.use(cors({
  origin: 'http://localhost:4200', // url front-end
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middleware to analize json
app.use(express.json());

// user routes
app.use('/api/users', userRoutes);

// insit server
app.listen(port, () => {
  console.log(`Servidor Node escuchando en http://localhost:${port}`);
});
