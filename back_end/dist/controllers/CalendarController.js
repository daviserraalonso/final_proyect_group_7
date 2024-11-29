"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCourseEvent = void 0;
const CourseEvent_1 = __importDefault(require("../models/CourseEvent"));
const getAllCourseEvent = async (req, res) => {
    console.log('Obteniendo datos del calendario');
    try {
        const events = await CourseEvent_1.default.findAll();
        console.log(events);
        res.status(200).json(events);
    }
    catch (error) {
        console.error('Error al obtener los eventos:', error);
        res.status(500).json({ message: 'Error al obtener los eventos' });
    }
};
exports.getAllCourseEvent = getAllCourseEvent;
