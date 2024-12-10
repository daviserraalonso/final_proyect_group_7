import express, { Router, Request, Response } from 'express';
import CategoriesController from '../controllers/CategoriesController';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        await CategoriesController.getAllCategories(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las categorías' });
    }
});

router.post('/', CategoriesController.createCategory);

module.exports = router;
