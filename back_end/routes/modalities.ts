import express, { Router, Request, Response } from 'express';

import ModalityController from '../controllers/ModalityController';

const router = express.Router();

router.get('/', ModalityController.getAllModalities);

router.post('/', ModalityController.createModality);

module.exports = router;
