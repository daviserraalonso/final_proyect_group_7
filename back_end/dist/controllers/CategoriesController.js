"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Category_1 = __importDefault(require("../models/Category"));
class CategoriesController {
    // Obtener todas las categorías
    static async getAllCategories(req, res) {
        try {
            const categories = await Category_1.default.findAll();
            res.status(200).json(categories);
        }
        catch (error) {
            console.error('Error al obtener las categorías:', error);
            res.status(500).json({ message: 'Error al obtener las categorías' });
        }
    }
    // Crear una nueva categoría
    static async createCategory(req, res) {
        try {
            const { name } = req.body;
            const newCategory = await Category_1.default.create({ name });
            res.status(201).json(newCategory);
        }
        catch (error) {
            console.error('Error al crear la categoría:', error);
            res.status(500).json({ message: 'Error al crear la categoría' });
        }
    }
}
exports.default = CategoriesController;
