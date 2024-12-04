"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Modality_1 = __importDefault(require("../models/Modality"));
class ModalityController {
    // Obtener todas las modalidades
    static async getAllModalities(req, res) {
        try {
            const modalities = await Modality_1.default.findAll();
            res.status(200).json(modalities);
        }
        catch (error) {
            console.error('Error al obtener las modalidades:', error);
            res.status(500).json({ message: 'Error al obtener las modalidades' });
        }
    }
    // Crear una nueva modalidad
    static async createModality(req, res) {
        try {
            const { name } = req.body;
            const newModality = await Modality_1.default.create({ name });
            res.status(201).json(newModality);
        }
        catch (error) {
            console.error('Error al crear la modalidad:', error);
            res.status(500).json({ message: 'Error al crear la modalidad' });
        }
    }
}
exports.default = ModalityController;
