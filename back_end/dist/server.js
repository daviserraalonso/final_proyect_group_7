"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user');
const { fileURLToPath } = require('url');
const { dirname } = require('path');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = express();
const port = process.env['PORT'] || 4000;
// CORS config
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
// middleware to use json
app.use(express.json());
// userss routes
app.use('/api/users', userRoutes);
// init server
app.listen(port, () => {
    console.log(`Servidor Node escuchando en http://localhost:${port}`);
});
