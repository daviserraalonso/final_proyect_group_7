import express, { Router, Request, Response } from 'express';
import CategoriesController from '../controllers/CategoriesController';

const router = express.Router();

router.get('/', CategoriesController.getAllCategories);

router.post('/', CategoriesController.createCategory);

module.exports = router;
