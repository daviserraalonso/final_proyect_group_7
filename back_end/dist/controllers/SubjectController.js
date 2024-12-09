"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubject = exports.updateSubject = exports.createSubject = exports.getSubjectById = exports.getSubjects = void 0;
const Subject_1 = __importDefault(require("../models/Subject"));
const getSubjects = async (req, res) => {
    try {
        const subjects = await Subject_1.default.findAll();
        res.json(subjects);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching subjects', error });
    }
};
exports.getSubjects = getSubjects;
const getSubjectById = async (req, res) => {
    const { id } = req.params;
    try {
        const subject = await Subject_1.default.findByPk(id);
        if (!subject)
            return res.status(404).json({ message: 'Subject not found' });
        res.json(subject);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching subject', error });
    }
};
exports.getSubjectById = getSubjectById;
const createSubject = async (req, res) => {
    const { name, courseId, description, finalGrade } = req.body;
    try {
        const newSubject = await Subject_1.default.create({
            name,
            courseId,
            description,
            finalGrade,
        });
        res.status(201).json(newSubject);
    }
    catch (error) {
        console.error('Error al crear la asignatura:', error);
        res.status(500).json({ message: 'Error al crear la asignatura.', error });
    }
};
exports.createSubject = createSubject;
const updateSubject = async (req, res) => {
    const { id } = req.params;
    const { name, courseId, description, finalGrade } = req.body;
    try {
        const subject = await Subject_1.default.findByPk(id);
        if (!subject)
            return res.status(404).json({ message: 'Subject not found' });
        await subject.update({ name, courseId, description, finalGrade });
        res.json(subject);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating subject', error });
    }
};
exports.updateSubject = updateSubject;
const deleteSubject = async (req, res) => {
    const { id } = req.params;
    try {
        const subject = await Subject_1.default.findByPk(id);
        if (!subject)
            return res.status(404).json({ message: 'Subject not found' });
        await subject.destroy();
        res.json({ message: 'Subject deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting subject', error });
    }
};
exports.deleteSubject = deleteSubject;
