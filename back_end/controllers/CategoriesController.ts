import { Request, Response } from 'express';
import Category from '../models/Category';

class CategoriesController {
  // Obtener todas las categorías
  static async getAllCategories(req: Request, res: Response): Promise<void> {
    try {
      const categories = await Category.findAll();
      res.status(200).json(categories);
    } catch (error) {
      console.error('Error al obtener las categorías:', error);
      res.status(500).json({ message: 'Error al obtener las categorías' });
    }
  }

  // Crear una nueva categoría
  static async createCategory(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.body;
      const newCategory = await Category.create({ name });
      res.status(201).json(newCategory);
    } catch (error) {
      console.error('Error al crear la categoría:', error);
      res.status(500).json({ message: 'Error al crear la categoría' });
    }
  }
}

export default CategoriesController;
