"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database').default;
const associations_1 = __importDefault(require("./models/associations")); // because it´s a function
const userRoutes = require('./routes/user');
const subjectRoutes = require('./routes/subject');
const courseRoutes = require('./routes/course');
const categoriesRoutes = require('./routes/categories');
const modalitiesRoutes = require('./routes/modalities');
const contactRoutes = require('./routes/contactRoutes');
const taskRoutes = require('./routes/taskRoutes');
const studentCoursesRoutes = require('./routes/strudentCoursesRoutes');
const professorRoutes = require('./routes/professor');
const scoreRoutes = require('./routes/scoreRoutes');
// config dotenv
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
// config associations
(0, associations_1.default)();
// syncronize db
sequelize.sync({ alter: true })
    .then(() => {
    console.log('Base de datos sincronizada');
})
    .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
});
// routes
app.use('/api/users', userRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/modalities', modalitiesRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/student-courses', studentCoursesRoutes);
app.use('/api/score', scoreRoutes);
app.use('/api/professors', professorRoutes);
// init server
app.listen(port, () => {
    console.log(`Servidor Node escuchando en http://localhost:${port}`);
});
