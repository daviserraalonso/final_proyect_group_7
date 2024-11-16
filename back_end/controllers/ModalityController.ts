import { Request, Response } from 'express';
import Modality from '../models/Modality';

class ModalityController {
  // Obtener todas las modalidades
  static async getAllModalities(req: Request, res: Response): Promise<void> {
    try {
      const modalities = await Modality.findAll();
      res.status(200).json(modalities);
    } catch (error) {
      console.error('Error al obtener las modalidades:', error);
      res.status(500).json({ message: 'Error al obtener las modalidades' });
    }
  }

  // Crear una nueva modalidad
  static async createModality(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.body;
      const newModality = await Modality.create({ name });
      res.status(201).json(newModality);
    } catch (error) {
      console.error('Error al crear la modalidad:', error);
      res.status(500).json({ message: 'Error al crear la modalidad' });
    }
  }
}

export default ModalityController;
