"use strict";
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user');
const subjectRoutes = require('./routes/subject');
const courseRoutes = require('./routes/course');
const categoriesRoutes = require('./routes/categories');
const modalitiesRoutes = require('./routes/modalities');
// Configuración de dotenv
dotenv.config();
const app = express();
const port = process.env['PORT'] || 3000;
// CORS
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
// Middleware
app.use(express.json());
// routes
app.use('/api/users', userRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/modalities', modalitiesRoutes);
// init server
app.listen(port, () => {
    console.log(`Servidor Node escuchando en http://localhost:${port}`);
});
